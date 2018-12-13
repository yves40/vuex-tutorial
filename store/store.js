/*----------------------------------------------------------------------------
    store.js    

    Dec 09 2018   Initial
    Dec 10 2018   Learn Getters, Actions, Mutations...
    Dec 11 2018   Track requests in a log window. Learn Promises
    Dec 12 2018   Remove finished request from the log window
    Dec 13 2018   Modify counter management
----------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    reqid: 10000,
    count: 5,
    Version: 'store, 1.49 Dec 13 2018',
    logs: [],
    mutationrunning: 0, // Used to track the current number of operations running
    requests: [],
    MAXRUN: 4, // Max number of concurrent operations
    MINDELAY: 3,
    MAXDELAY: 12,
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

// Simulate some long task running between 5 and 20 sec
function generateRandomNumber(min , max) 
{
    return Math.floor(Math.random() * (max-min) + min) ;
}
// Logger
function log(mess) {
    let timestamp = new Date().toString();
    let x = timestamp.indexOf('GMT');
    state.logs.push({ date: timestamp.substring(0, x - 1), message: mess });
}

const mutations = { // Synchronous
    increment(state) {
        ++state.mutationrunning;
        let taskduration = generateRandomNumber(state.MINDELAY, state.MAXDELAY);
        log('Increment requested, should take ' + taskduration +  ' seconds'); 
        let thereqid = ++state.reqid;
        state.requests.push( { date: new Date().toString(), label: 'Increment OPS for ' + taskduration + ' sec', id: thereqid });
        let sometasktakingtime = new Promise(function(resolve, reject) {
            setTimeout(function() {
                if ( state.count < 10 ){
                    state.count++;
                    resolve('Increment done : now removing REQID ' + thereqid);
                }
                else{
                    resolve('Increment aborted, max limit reached : now removing REQID ' + thereqid);
                }
                let filtered = state.requests.filter( function(value, index){
                    return value.id != thereqid;
                })
                state.requests = filtered;
                --state.mutationrunning
            }, taskduration * 1000)})
        .then(function(message) {
            log(message);
        });
    },
    decrement(state) {
        ++state.mutationrunning;
        let taskduration = generateRandomNumber(state.MINDELAY, state.MAXDELAY);
        log('Decrement requested, should take ' + taskduration +  ' seconds');
        let thereqid = ++state.reqid;
        state.requests.push( { date: new Date().toString(), label: 'Decrement OPS for ' + taskduration + ' sec', id: thereqid });
        let sometasktakingtime = new Promise(function(resolve, reject) {
            setTimeout(function() {
                if (state.count > 0 ) {
                    state.count--;
                    resolve('Decrement done : now removing REQID ' + thereqid);
                }
                else {
                    resolve('Decrement aborted, already 0 : now removing REQID ' + thereqid);
                }
                let filtered = state.requests.filter( function(value, index){
                    return value.id != thereqid;
                })
                state.requests = filtered;
                --state.mutationrunning
            }, taskduration * 1000)})
        .then(function(message) {
            log(message );
        });
    },
};

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

