//----------------------------------------------------------------------------
//    myenv.js
//
//    Dec 02 2018   Initial
//    Dec 03 2018   Prefix not hard coded
//    Dec 07 2018   Problem with mono node config and CORS
//    Jan 16 2019   Start working on services in the CAMS app
//    Jan 17 2019   Port 8081
//    Jan 21 2019   CORS
//    Jan 22 2019   Remove some logging
//    Feb 01 2019   Extract CORS to cors.js
//    Feb 10 2019   mongodb param here
//                  Work on mongo status
//    Feb 11 2019   mongo status check
//                  Change mongo URI to remote node
//    Feb 21 2019   WIP on mongodb status check
//    Feb 28 2019   WIP on mongodb connection checking
//    Mar 01 2019   WIP on mongodb connection checking II
//                  No more mongo here, specific file
//----------------------------------------------------------------------------
const Version = "myenv:1.49, Mar 01 2019 ";

// URL prefix used to call the services node
const prefix = process.env.NODEURLPREFIX || "http://vboxweb:8081";
// For the server.js
const port = "8081";

module.exports.getMode = function getMode() {
  const devmode = process.env.NODEDEVMODE || "true";
  if (devmode.toUpperCase() === "TRUE") {
    return "DEV";
  } else {
    return "PROD";
  }
};
module.exports.getURLprefix = function getURLprefix() {
  if (this.getMode() === "DEV") {
    return prefix;
  } else {
    return "";
  }
};
module.exports.getPrefixSource = function getPrefixSource() {
  if (process.env.NODEURLPREFIX) {
    return "From shell";
  } else {
    return "From javascript";
  }
};
module.exports.getVersion = function getVersion() {
  return Version;
};

module.exports.getPort = function getPort() {
  return port;
};
