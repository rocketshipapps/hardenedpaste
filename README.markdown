# ![Logo](assets/logo.gif) Hardened Paste

*[Hardened Paste](http://hardenedpaste.com/) is a browser extension from the
creator of [Adblock Fast](https://github.com/rocketshipapps/adblockfast),
[Disconnect](http://techcrunch.com/2010/12/13/former-googler-launches-disconnect-browser-extension-that-disables-third-party-data-tracking/),
and
[Facebook Disconnect](http://techcrunch.com/2010/10/20/google-facebook-disconnec/)
that prevents the
[“pastejacking” exploit](https://github.com/dxa4481/Pastejacking). Pastejacking
otherwise allows a [malicious webpage](https://security.love/Pastejacking/)
(this is a proof of concept) to copy arbitrary content to your clipboard. The
extension mitigates this threat by providing a shim that overrides exploitable
JavaScript methods. Hardened Paste’s toolbar icon animates whenever a potential
attack is detected and stopped.*

To get started:

1. Install
[Hardened Paste for Chrome](https://chrome.google.com/webstore/detail/hardened-paste/[extension ID])
(an Opera port is in review).

2. Verify that installing the extension
[has patched the exploit](https://security.love/Pastejacking/) (you may have to
use your keyboard to copy, pressing **Control-C** with Windows or \*nix or
**Command-C** with OS X, to trigger an attack).

3. Follow [Hardened Paste on Facebook](https://www.facebook.com/hardenedpaste)
or [on Twitter](https://twitter.com/hardenedpaste) for app news.

Hardened Paste includes the
[port.js library](https://github.com/oldestlivingboy/port).

**Pull requests are welcome<em>!</em>**

## License

Copyright 2016 [Rocketship](https://github.com/rocketshipapps)

This program is free software, excluding the brand features identified in the
[Exceptions](#exceptions) below: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the
[GNU General Public License](https://www.gnu.org/licenses/gpl.html) for more
details.

## Exceptions

The Hardened Paste and Rocketship logos, trademarks, domain names, and other
brand features used in this program cannot be reused without permission and no
license is granted thereto.
