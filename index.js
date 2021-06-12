const fetch = require('node-fetch'), hostname = "", token = "";
let lastIP;

async function checkIP() { 
    const ipRequest = await fetch('https://api.my-ip.io/ip.json');

    if (!ipRequest.ok) return console.error("there was an error getting new IP")
    const ipRequestJSON = await ipRequest.json()

    if (lastIP === ipRequestJSON.ip) return
    console.log(`new IP: ${ipRequestJSON.ip}`)

    const updateResponce = await fetch(`https://www.duckdns.org/update?domains=${hostname}&token=${token}&verbose=true`)
    .catch(err => console.log);

    console.log(`Updated duckdns to ${ipRequestJSON.ip} with responce: ${ipRequest.status}`)       
}
setInterval(checkIP, 7200000);
