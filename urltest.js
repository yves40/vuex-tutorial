//----------------------------------------------------------------------------
//    urltest.js
//
//    Dec 20 2018    Initial
//----------------------------------------------------------------------------

const Version = "urltest.js, Dec 20 2018, 1.28 ";

const fetch = require("node-fetch");

console.log('----------------- urltest -------------------------------');
console.log(Version);
const camuser = process.env.camuser;
const campass = process.env.campass;

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
  // Look @ : https://appdividend.com/2018/08/20/javascript-fetch-api-example-tutorial/
  let result = fetch(theurl)
  .then(response => { 
      return response.text();
  })
  .then(text => {
      console.log(text === undefined ? 'No data' : text);
  })
  .catch(error => {
    console.log('************************************* E R R O R ********************************');
    console.log(error);
  });
};

// ------------ Call Test URL ------ ------------------------------------------
const cam1 = process.env.camurl || 'http://82.229.126.186:8080/cgi-bin/CGIProxy.fcgi?cmd=getIPInfo';
const target = cam1 + '&usr=' + camuser + '&pwd=' + campass; 
console.log('Calling CAM1 now :' + cam1);
urlcall(target);
