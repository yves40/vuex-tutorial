//----------------------------------------------------------------------------
//    axiosutility.js
//
//    Feb 06 2019   Initial
//    Feb 08 2019   Initial
//----------------------------------------------------------------------------
const axios = require('axios');
const myenv = require('./myenv');

const Version = 'axiosutility:1.11, Feb 08 2019';

module.exports.getAxios = function getAxios() {
  return axios.create({
    baseURL: myenv.getURLprefix(),
    timeout: 1000,
    withCredentials: true,
  });  
}

module.exports.getVersion = function getVersion() {
  return Version;
};
