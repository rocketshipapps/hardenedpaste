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
var root = document.documentElement;
var hardenedpaste = document.createElement('input');
hardenedpaste.type = 'hidden';
hardenedpaste.name = 'hardenedpaste';

new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName == 'value')
        chrome.runtime.sendMessage({hardenedpaste: true}, function() {
          hardenedpaste.removeAttribute('value');
        });
  });
}).observe(hardenedpaste, {attributes: true});

(document.body || root).appendChild(hardenedpaste);
var shim = document.createElement('script');
shim.textContent =
    'var _addEventListener = EventTarget.prototype.addEventListener; \n\
var _execCommand = document.execCommand; \n\
var hardenedpaste = document.getElementsByName(\'hardenedpaste\')[0]; \n\
\n\
EventTarget.prototype.addEventListener = \n\
    function(type, listener, useCapture) { \n\
      if (type == \'copy\') \n\
          _addEventListener.call(this, type, function() { \n\
            hardenedpaste.value = true; \n\
          }); \n\
      else _addEventListener.call(this, type, listener, useCapture); \n\
    } \n\
\n\
document.execCommand = function(command, showUI, commandValue) { \n\
  var returnValue; \n\
\n\
  if (command == \'copy\') hardenedpaste.value = true; \n\
  else { \n\
    _execCommand.call(document, command, showUI, commandValue); \n\
    returnValue = true; \n\
  } \n\
\n\
  return returnValue; \n\
}';
(document.head || root).appendChild(shim);
