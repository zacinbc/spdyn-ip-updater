const IpMonitor = require('ip-monitor'), axios = require('axios');

const hostname = "", token = "";

const ipMonitor = new IpMonitor({pollingInterval: 36000,verbose: true,externalIp: {timeout: 1000,getIP: 'parallel',services: ['http://icanhazip.com/'],replace: true,verbose: true}});
ipMonitor.on('error', (error) => console.error(error));

ipMonitor.start();
ipMonitor.on('change', (prevIp, newIp) => {
    if(prevIp && newIp && prevIp!=newIp){
        axios.get(`https://update.spdyn.de/nic/update?hostname=${hostname}&myip=${newIp}&user=hostname&pass=token`)
        .then((response)=> {
            if (response.ok) console.log('DDNS IP successfully updated');
        })
        .catch((error)=>console.loerror))
    }
});
