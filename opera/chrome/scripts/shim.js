/*
  Copyright 2016 Rocketship <https://rocketshipapps.com/>

  This program is free software: you can redistribute it and/or modify it under
  the terms of the GNU General Public License as published by the Free Software
  Foundation, either version 3 of the License, or (at your option) any later
  version.

  This program is distributed in the hope that it will be useful, but WITHOUT
  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

  You should have received a copy of the GNU General Public License along with
  this program. If not, see <https://www.gnu.org/licenses/>.

  Authors (one per line):

    Brian Kennish <oldestlivingboy@gmail.com>
*/
var _execCommand = HTMLDocument.prototype.execCommand;
var showIndicator = document.getElementsByName('hardenedpaste-indicator')[0];
var _addEventListener = EventTarget.prototype.addEventListener;

HTMLDocument.prototype.execCommand = function(command, showUI, commandValue) {
  var returnValue;

  if (command == 'copy' || command == 'cut') showIndicator.value = true;
  else {
    _execCommand.call(document, command, showUI, commandValue);
    returnValue = true;
  }

  return returnValue;
}

EventTarget.prototype.addEventListener = function(type, listener, useCapture) {
  if (type == 'copy' || type == 'cut')
      _addEventListener.call(this, type, function() {
        showIndicator.value = true;
      });
  else _addEventListener.call(this, type, listener, useCapture);
}

DataTransfer.prototype.setData = function() { showIndicator.value = true; }
