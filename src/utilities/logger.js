//----------------------------------------------------------------------------
//    logger.js
//
//    Mar 05 2019   Initial (Toulouse ENAC)
//    Mar 06 2019   Add log level to the trace
//    Mar 08 2019   test a call from App.vue
//                  Also check that tracing to a file is only possible if not 
//                  requested from a browser
//    Mar 13 2019   Check LOGMODE and LOGFILE variables works
//                  Modify file output logic
//    Mar 14 2019   use helper for dates
//    Apr 03 2019   Test for error : Cannot read property of undefined
//----------------------------------------------------------------------------
const Version = 'logger:1.31, Apr 03 2019';

const fs = require('fs'); 

const MAXLOGS = 10;
const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
let logs = [];

const DEBUG = 0;
const INFORMATIONAL = 1;
const WARNING = 2;
const ERROR = 3;
const FATAL = 4;
// ENV shell variables LOGMODE and LOGFILE defines log level and log destination 
// If LOGFILE is defined, it automatically turns the logger to file output, 
// except if used in a browser
const LOGMODE = process.env.LOGMODE || DEBUG;
let OUTFILE = process.env.LOGFILE || '/tmp/' + Version.replace(/[,:]/g,'_').replace(/ /g, '_') + '.log'
let tracetofileflag = false;
let tracetoconsoleflag = true;

module.exports.DEBUG = DEBUG;
module.exports.INFORMATIONAL = INFORMATIONAL;
module.exports.WARNING = WARNING;
module.exports.ERROR = ERROR;
module.exports.FATAL = FATAL;

//----------------------------------------------------------------------------
// Small func to return a readable status
//----------------------------------------------------------------------------
function levelToString(level) {
    switch (level) {
        case DEBUG: return 'DBG';
        case INFORMATIONAL: return 'INF';
        case WARNING: return 'WRN';
        case ERROR: return 'ERR';
        case FATAL: return 'FTL';
        default: return 'FTL';
    }
}

//-----------------------------------------------------
// Logger infos
// Returns an object with logger data
//-----------------------------------------------------
module.exports.getLoggerInfo = function getLoggerInfo() {
    loggerinfo = {};
    loggerinfo.version = Version;
    if (process.env.LOGMODE) {
        loggerinfo.logleveldefiner = 'Shell defined as ' +  process.env.LOGMODE;
    }
    else {
        loggerinfo.logleveldefiner = 'Program defined, using default DEBUG level';
    }
    loggerinfo.loglevel = levelToString(parseInt(LOGMODE, 10));
    if (process.env.LOGFILE) {
        loggerinfo.logfiledefiner = 'Shell defined';
    }
    else {
        loggerinfo.logfiledefiner = 'Program defined';
    }
    loggerinfo.logfile = OUTFILE;
    if (tracetoconsoleflag) 
        loggerinfo.tracetoconsole = 'Console log enabled'; 
    else 
        loggerinfo.tracetoconsole = 'Console log disabled';
    if (tracetofileflag)
        loggerinfo.tracetofile = 'File log enabled';
    else
        loggerinfo.tracetofile = 'File log disabled';

    return loggerinfo;
}

//----------------------------------------------------------------------------
// The logger 
// syncmode set to TRUE if waiting for the I/O to complete
//----------------------------------------------------------------------------
function log(mess, level, syncmode = false) {
    if (level >= LOGMODE) {
        let d = new Date();
        if (logs.length === MAXLOGS) {
            logs.shift();                   // Handle the log buffer
        }
        let logstring = months[d.getMonth()] + '-' + d.getDate() + '-' + d.getFullYear() + ' ' 
                + d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") 
                + ' [' + levelToString(level) + '] '
                + ' ' + mess ;
       logs.push( logstring);
        let display = null;
        // Is the module called from a browser or from a standalone script ? 
        if (typeof window === 'undefined') {
            display = console;
        }
        else {
             display = window.console;
        }
        if (tracetoconsoleflag)
            display.log(logstring);
        // trace to a file ? ( only if not called from a browser )
        if (tracetofileflag && (typeof window === 'undefined') ) {
            if (syncmode) 
                fs.appendFileSync(OUTFILE,logstring + '\n', 'utf8', function(err) {
                    if (err) {
                        throw 'Error opening the trace file. Set LOGFILE environment variable to the desired location';
                    }
                });
            else {
                fs.appendFile(OUTFILE,logstring + '\n', 'utf8', function(err) {
                    if (err) {
                        throw 'Error opening the trace file. Set LOGFILE environment variable to the desired location';
                    }
                });
            }
        }
    return;
    }
}

//----------------------------------------------------------------------------
// Functions used to switch console mode
//----------------------------------------------------------------------------
module.exports.enableconsole = function enableconsole() {
    tracetoconsoleflag = true;
}

module.exports.disableconsole = function disableconsole() {
    if (tracetofileflag)            // If no trace set to file, do not disable the console
        tracetoconsoleflag = false;
}

//-----------------------------------------------------
//  Set the file trace
//  If no filename passed, will default to OUTFILE
//  which itsel depends on either LOGFILE environment 
//  variable or a default (see code above)
//-----------------------------------------------------
module.exports.tracetofile = function tracetofile(filename = OUTFILE) {
    tracetofileflag = true;
    OUTFILE = filename;
}
//-----------------------------------------------------
// For ASync mode
//-----------------------------------------------------
module.exports.debug = function debug(mess) {
    log(mess, DEBUG);
    return;
}
module.exports.info = function info(mess) {
    log(mess, INFORMATIONAL);
    return;
}
module.exports.warning = function warning(mess) {
    log(mess, WARNING);
    return;
}
module.exports.error = function error(mess) {
    log(mess, ERROR);
    return;
}
module.exports.fatal = function fatal(mess) {
    log(mess, FATAL);
    return;
}
//-----------------------------------------------------
// For Sync mode
//-----------------------------------------------------
module.exports.debugs = function debugs(mess) {
    log(mess, DEBUG, true);
    return;
}
module.exports.infos = function infos(mess) {
    log(mess, INFORMATIONAL, true);
    return;
}
module.exports.warnings = function warnings(mess) {
    log(mess, WARNING, true);
    return;
}
module.exports.errors = function errors(mess) {
    log(mess, ERROR, true);
    return;
}
module.exports.fatals = function fatals(mess) {
    log(mess, FATAL, true);
    return;
}
