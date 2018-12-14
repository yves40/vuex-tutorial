/*----------------------------------------------------------------------------
    store.js    

    Dec 09 2018   Initial
    Dec 10 2018   Learn Getters, Actions, Mutations...
    Dec 11 2018   Track requests in a log window. Learn Promises
    Dec 12 2018   Remove finished request from the log window
    Dec 13 2018   Modify counter management
    Dec 14 2018   MAxlog and scroll window
----------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';
import { request } from 'http';

Vue.use(Vuex);

const state = {
    reqid: 10000,
    count: 5,
    Version: 'store, 1.64 Dec 15 2018',
    logs: [],
    mutationrunning: 0, // Used to track the current number of operations running
    requests: [], // Running requests
    MAXRUN: 4, // Max number of concurrent operations
    MINDELAY: 8,
    MAXDELAY: 16,
    MAXLOG:12,
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
    getRunning(state) {
        return state.mutationrunning === state.MAXRUN;
    },
    getRequests(state) {
        return state.requests;
    }

};

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
    state.logs.push({ date: months[d.getMonth()] + '-' + d.getDate() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() , message: id + ' ' + mess });
}

// ---------------------------------------------------- New request in Queue
function request(reqid) {
    let td = generateRandomNumber(state.MINDELAY, state.MAXDELAY);
    state.requests.push( { date: new Date().toString(), label: 'Increment OPS for ' + td + ' sec', id: reqid });
    return td;
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
                    resolve('Increment aborted, max limit reached');
                }
                let filtered = state.requests.filter( function(value, index){
                    return value.id != thereqid;
                })
                state.requests = filtered;
                --state.mutationrunning
            }, taskduration * 1000)})
        .then(function(message) {
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
                    resolve('Decrement aborted, already 0');
                }
                let filtered = state.requests.filter( function(value, index){
                    return value.id != thereqid;
                })
                state.requests = filtered;
                --state.mutationrunning
            }, taskduration * 1000)})
        .then(function(message) {
            log(message, thereqid );
        });
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
};

export const store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions,
    }
);

