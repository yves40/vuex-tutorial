//----------------------------------------------------------------------------
//    urltest.js
//
//    Dec 20 2018    Initial
//----------------------------------------------------------------------------

const Version = "urltest.js, Dec 20 2018, 1.20 ";

const fetch = require("node-fetch");

console.log('----------------- urltest -------------------------------');
console.log(Version);
const camuser = process.env.camuser;
const campass = process.env.campass;
let done = false;

if (camuser === undefined) {
  console.log('Please set camuser variable in your shell');
  process.exit(1);
}
if (campass === undefined) {
  console.log('Please set campass variable in your shell');
  process.exit(1);
}

// ------------ The working function ------------------------------------------
function urlcall(theurl) {
  console.log('Calling ---------- ' + theurl);
  let result = fetch(theurl)
  .then(response => console.log(response))
  .then(data =>
    console.log(data === undefined ? 'No data' : data)
  )
  .catch(error => {
    console.log(error);
    done = true;
  });

/*
  .then(data => { 
    console.log(data.json());
    done = true;
  })
  .then(res => { 
    console.log(res) 
    done = true;
  })
  */
};

// ------------ Call Test URL ------ ------------------------------------------
const cam1 = 'http://82.229.126.186:8080/cgi-bin/CGIProxy.fcgi?cmd=getIPInfo';
const target = cam1 + '&usr=' + camuser + '&pwd=' + campass; 
console.log('Calling CAM1 now :' + cam1);
urlcall(target);
