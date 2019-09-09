//----------------------------------------------------------------------------
//    server.js
//
//    Dec 18 2018    Initial
//    Sep 08 2019    Wake up old code
//----------------------------------------------------------------------------

const Version = "server.js, Sep 08 2019, 1.11 ";

const express = require('express');
const cors = require('cors');
const axiosutility = require("./src/utilities/axiosutility");
const logger = require("./src/utilities/logger");
const corsutility = require("./src/utilities/corsutility");
const bodyParser  = require('body-parser');

//----------------------------------------------------------------------------
// axiosutility test
//----------------------------------------------------------------------------
logger.info("---------------------------------------------------------");
logger.info('AXIOS :');
logger.info("---------------------------------------------------------");
logger.info('Using axiosutility: ' + axiosutility.getVersion());


//----------------------------------------------------------------------------
// Cross-Origin Resource Sharing
// https://github.com/expressjs/cors/blob/master/README.md
//----------------------------------------------------------------------------
logger.info("---------------------------------------------------------");
logger.info('CORS Security setting, sites list:');
logger.info("---------------------------------------------------------");

let loop = 0;
let sitelist = corsutility.getCORSwhitelist();
for (; loop < sitelist.length; ++loop) {
  logger.info('Site : ' + sitelist[loop]);
}

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));
const router = express.Router();

logger.info('----------------- Set some routes -------------------------------');
// Home URL
logger.info('/');
router.get('/', function (req, res) {
  res.json({message: 'API initialized'});
})
router.get('/test', function (req, res) {
  res.json({message: 'API test is OK for me but CORS blocks Chrome'});
})

// For the favicon boring request error
app.use( function(req, res, next) {

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});

app.use(cors(corsutility.getCORS()));

logger.info('----------------- Server status -------------------------------');
const port = process.env.API_PORT || 8088;
app.use('/', router);
app.listen(port, function() {
  logger.info(Version);
  logger.info(`Vuex server started on ${port}`);
});
