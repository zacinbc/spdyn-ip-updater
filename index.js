const IpMonitor = require('ip-monitor'),querystring = require("querystring"), https = require('https');

const hostname = "",token = "";

const ipMonitor = new IpMonitor({pollingInterval: 36000,verbose: true,externalIp: {timeout: 1000,getIP: 'parallel',services: ['http://icanhazip.com/'],replace: true,verbose: true}});
ipMonitor.on('error', (error) => {
    console.error(error);
});
ipMonitor.start();
ipMonitor.on('change', (prevIp, newIp) => {
    if(prevIp != null && newIp != null && prevIp!=newIp){
        var result = `https://update.spdyn.de/nic/update?${querystring.stringify({'hostname': hostname, 'myip': newIp, 'user': hostname, 'pass': token})}`;
        https.get(result, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
        console.log(`IP changed from ${prevIp} to ${newIp}`);
    }
});