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
var showIndicator = document.createElement('input');
var head = document.head || root;
var inlineShim = document.createElement('script');
showIndicator.type = 'hidden';
showIndicator.name = 'hardenedpaste-indicator';

new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.attributeName == 'value' &&
        chrome.runtime.sendMessage({showIndicator: true}, function() {
          showIndicator.removeAttribute('value');
        });
  });
}).observe(showIndicator, {attributes: true});

(document.body || root).appendChild(showIndicator);
inlineShim.textContent =
    'var inliningAllowed = document.createElement(\'input\');\n\
var _execCommand = HTMLDocument.prototype.execCommand;\n\
var showIndicator =\n\
    document.getElementsByName(\'hardenedpaste-indicator\')[0];\n\
var _addEventListener = EventTarget.prototype.addEventListener;\n\
inliningAllowed.type = \'hidden\';\n\
inliningAllowed.name = \'hardenedpaste-inlining\';\n\
inliningAllowed.value = true;\n\
(document.body || document.documentElement).appendChild(inliningAllowed);\n\
\n\
HTMLDocument.prototype.execCommand =\n\
    function(command, showUI, commandValue) {\n\
      var returnValue;\n\
\n\
      if (command == \'copy\' || command == \'cut\')\n\
          showIndicator.value = true;\n\
      else {\n\
        _execCommand.call(document, command, showUI, commandValue);\n\
        returnValue = true;\n\
      }\n\
\n\
      return returnValue;\n\
    }\n\
\n\
EventTarget.prototype.addEventListener =\n\
    function(type, listener, useCapture) {\n\
      if (type == \'copy\' || type == \'cut\')\n\
          _addEventListener.call(this, type, function() {\n\
            showIndicator.value = true;\n\
          });\n\
      else _addEventListener.call(this, type, listener, useCapture);\n\
    }\n\
\n\
DataTransfer.prototype.setData = function() { showIndicator.value = true; }';
head.appendChild(inlineShim);

if (!document.getElementsByName('hardenedpaste-inlining')[0]) {
  var externalShim = document.createElement('script');
  externalShim.src =
      chrome.extension.getURL(
        (navigator.userAgent.indexOf('OPR') + 1 ? 'chrome/' : '') +
            'scripts/shim.js'
      );
  head.appendChild(externalShim);
}
