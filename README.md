# ddns-updater
 automatically update [duckdns](https://duckdns.org/) ip address

### How to setup and install 
1) download this repo
2) open this repo in terminal (`cd Downloads/duckdns-updater-master/`)
3) open index.js
4) edit line 1 `let axios = require('axios'),lastIP , hostname = "", token = "";` in token put your update token and in hostname put your ddns address excluding `.duckdns.org`
5) run `npm install` to install dependencies
