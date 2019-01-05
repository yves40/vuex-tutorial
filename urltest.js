//----------------------------------------------------------------------------
//    urltest.js
//
//    Dec 20 2018    Initial
//    Dec 21 2018    WIP on test URLs
//    Dec 22 2018    Cams tests
//----------------------------------------------------------------------------

const Version = "urltest.js, Dec 22 2018, 1.32 ";

const fetch = require("node-fetch");

console.log();
console.log(Version + '----------------- urltest -------------------------------');
const camuser = process.env.CAMUSER;
const campass = process.env.CAMPASS;

// ------------ The working function ------------------------------------------
function urlcall(theurl) {
  console.log(Version + 'Calling ---------- ' + theurl);
  console.log('\n==========================================================================\n\n');

  // Look @ : https://appdividend.com/2018/08/20/javascript-fetch-api-example-tutorial/
  //      @ : https://javascript.info/promise-chaining 
  
  let result = fetch(theurl)
  .then(response => { 
      return response.text();
  })
  .then(text => {
    console.log(Version + text === undefined ? 'No data' : text);
    console.log('\n\n');
  })
  .catch(error => {
    console.log(Version + '************************************* E R R O R ********************************');
    console.log(Version + error);
  });
};

// ------------ Call Test URL ------ ------------------------------------------
const cam1 = process.env.camurl || 'https://jsonplaceholder.typicode.com/users/2';
let target = '';
if (camuser !== undefined && campass !== undefined) {
  target = cam1 + '&usr=' + camuser + '&pwd=' + campass; 
}
else {
  console.log(Version + 'Using default test URL');
  target = cam1; 
}
console.log(Version + 'Calling CAM1 now :' + target);
urlcall(target);
