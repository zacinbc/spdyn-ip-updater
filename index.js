let axios = require('axios'),lastIP , hostname = "", token = "";

async function checkIP() { 
    let ipRequest = await axios.get('https://api.my-ip.io/ip.json');
    if (ipRequest.status === 200){
        console.log("got valid IP")
        if (lastIP !== ipRequest.data.ip){
            console.log(`new IP: ${ipRequest.data.ip}`)
            let updateResponce = await axios.get(`https://www.duckdns.org/update?domains=${hostname}&token=${token}&verbose=true`)
            console.log(updateResponce.data)       
        }
    }else console.error("there was an error getting new IP")
}
checkIP()
setInterval(checkIP, 7200000);
