/*----------------------------------------------------------------------------
    store.js    

    Dec 09 2018     Initial
    Dec 10 2018     Learn Getters, Actions, Mutations...
    Dec 11 2018     Track requests in a log window. Learn Promises
    Dec 12 2018     Remove finished request from the log window
    Dec 13 2018     Modify counter management
    Dec 14 2018     Maxlog and scroll window
    Dec 15 2018     Timestamp format, clear log
                    Problem with scroll every second
    Dec 17 2018     Fix refresh problem fro the log window 
    Dec 18 2018     Promise...reject
----------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';
import { request } from 'http';

Vue.use(Vuex);

const timerID = setInterval(timeClock, 1000);

const IDSTART = 10000;
const state = {
    reqid: IDSTART,
    count: 5,
    Version: 'store, 1.80 Dec 18 2018',
    logs: [],
    logschanged: 'false',
    mutationrunning: 0, // Used to track the current number of operations running
    requests: [], // Running requests
    clock: new Date().toTimeString(),
    IDSTART: 10000,
    MAXRUN: 4, // Max number of concurrent operations
    MINDELAY: 8,
    MAXDELAY: 16,
    MAXLOG:16,
};

const getters = {
    fetchCount(state) {
        return state.count;
    },
    getVersion(state) {
        return 'Store version is : ' + state.Version;
    },
    getLogs(state) {
        return state.logs;
    },
    getLogsSize(state) {
        return state.logs.length;
    },
    getRunningLimit(state) {
        return state.mutationrunning === state.MAXRUN;
    },
    getRunning(state) {
        return state.mutationrunning > 0;
    },
    getRequests(state) {
        return state.requests;
    },
    getRequestsNumber(state) {
        return state.reqid - IDSTART;
    },
    getTime(state) {
        return state.clock;
    },
};

// ---------------------------------------------------- Display a clock
function timeClock() {
    state.clock = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

// ---------------------------------------------------- Simulate some long task running between 5 and 20 sec
function generateRandomNumber(min , max) 
{
    return Math.floor(Math.random() * (max-min) + min) ;
}
// ---------------------------------------------------- Logger
const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
function log(mess, id) {
    let d = new Date();
    if (state.logs.length === state.MAXLOG) {
        state.logs.shift();
    }
    state.logs.push({ date: months[d.getMonth()] + '-' + d.getDate() + '-' + d.getFullYear() + ' ' 
            + d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"), message: id + ' ' + mess });
    state.logschanged = true;
}

// ---------------------------------------------------- New request in Queue
function request(reqid) {
    let td = generateRandomNumber(state.MINDELAY, state.MAXDELAY);
    state.requests.push( { date: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"), label: 'Increment OPS for ' + td + ' sec', id: reqid });
    state.logschanged = true;
    return td;
}

function testFetchURL() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => console.log(data));
}

// ---------------------------------------------------- VUEX mutations
const mutations = { // Synchronous
    increment(state) {
        ++state.mutationrunning;
        let thereqid = state.reqid;
        let taskduration = request(thereqid);
        log('Increment requested, should take ' + taskduration +  ' seconds', thereqid);
        ++state.reqid;
        let sometasktakingtime = new Promise(function(resolve, reject) {
            setTimeout(function() {
                if ( state.count < 10 ){
                    state.count++;
                    resolve('Increment done');
                }
                else{
                    reject('Increment aborted, max limit reached');
                }
                let filtered = state.requests.filter( function(value, index){
                    return value.id != thereqid;
                })
                state.requests = filtered;
                --state.mutationrunning
            }, taskduration * 1000)})
        .then(function(message) {
            log(message, thereqid);
        })
        .catch(function(message) {
            log(message, thereqid);
        });
    },
    decrement(state) {
        ++state.mutationrunning;
        let thereqid = state.reqid;
        let taskduration = request(thereqid);
        log('Decrement requested, should take ' + taskduration +  ' seconds', thereqid);  
        ++state.reqid;
        let sometasktakingtime = new Promise(function(resolve, reject) {
            setTimeout(function() {
                if (state.count > 0 ) {
                    state.count--;
                    resolve('Decrement done');
                }
                else {
                    reject('Decrement rejected, already 0');
                }
                let filtered = state.requests.filter( function(value, index){
                    return value.id != thereqid;
                })
                state.requests = filtered;
                --state.mutationrunning
            }, taskduration * 1000)})
        .then(function(message) {
            log(message, thereqid );
        })
        .catch(function(message) {
            log(message, thereqid);
        });
    },
    clearlog(state) {
        state.logs = [];
    },
};

// ---------------------------------------------------- VUEX actions
const actions = { // Asynchronous
    increment(context) { 
        context.commit('increment'); 
    },
    decrement(context) {
        context.commit('decrement');
    },
    clearlog(context) {
        context.commit('clearlog');
    },
};

export const store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions,
    }
);

