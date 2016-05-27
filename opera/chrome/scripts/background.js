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
var currentBuild = 1;
var path = navigator.userAgent.indexOf('OPR') + 1 ? 'chrome/' : '';

if (!localStorage.build) {
  localStorage.firstBuild = currentBuild;
  localStorage.build = currentBuild;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var tab = sender.tab;

  if (tab && message.protectedpaste) {
    var tabId = tab.id;
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: {
        19: path + 'images/unlocked/19.png', 38: path + 'images/unlocked/38.png'
      }
    });

    setTimeout(function() {
      chrome.browserAction.setIcon({
        tabId: tabId,
        path: {
          19: path + 'images/locked/19.png', 38: path + 'images/locked/38.png'
        }
      });
    }, 200);
  }

  sendResponse({});
});
