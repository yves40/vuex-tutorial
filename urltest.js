//----------------------------------------------------------------------------
//    urltest.js
//
//    Dec 20 2018    Initial
//    Dec 21 2018    WIP on test URLs
//----------------------------------------------------------------------------

const Version = "urltest.js, Dec 21 2018, 1.30 ";

const fetch = require("node-fetch");

console.log('----------------- urltest -------------------------------');
console.log(Version);
const camuser = process.env.camuser;
const campass = process.env.campass;

// ------------ The working function ------------------------------------------
function urlcall(theurl) {
  console.log('Calling ---------- ' + theurl);

  // Look @ : https://appdividend.com/2018/08/20/javascript-fetch-api-example-tutorial/
  //      @ : https://javascript.info/promise-chaining 
  
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
const cam1 = process.env.camurl || 'https://jsonplaceholder.typicode.com/users/2';
let target = '';
if (camuser !== undefined && campass !== undefined) {
  target = cam1 + '&usr=' + camuser + '&pwd=' + campass; 
}
else {
  target = cam1; 
}
console.log('Calling CAM1 now :' + target);
urlcall(target);
