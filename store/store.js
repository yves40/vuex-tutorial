/*----------------------------------------------------------------------------
    store.js    

    Dec 09 2018   Initial
    Dec 10 2018   Learn Getters, Actions, Mutations...
    Dec 11 2018   Track requests in a log window
    Dec 12 2018   Remove finished request from the log window
----------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    reqid: 0,
    count: 5,
    Version: 'store, 1.32 Dec 12 2018',
    message: '',
    mutationrunning: false,
    requests: [],
};

const getters = {
    fetchCount(state) {
        return state.count;
    },
    getVersion(state) {
        return 'Store version is : ' + state.Version;
    },
    getMessage(state) {
        return state.message;
    },
    getStatus(state) {
        return state.mutationrunning;
    },
    getRequests(state) {
        return state.requests;
    }

};

// Simulate some long task
const DELAY = 5; // seconds

const mutations = { // Synchronous
    increment(state) {
        if ( state.count < 10 ){
            state.count++;
            state.mutationrunning = true;
            state.message = 'Increment requested, should take ' + DELAY +  ' seconds'; 
            let thereqid = ++state.reqid;
            state.requests.push( { date: new Date().toString(), label: 'Increment', id: thereqid });
            let sometasktakingtime = new Promise(function(resolve, reject) {
                setTimeout(function() {
                  resolve('Increment done : now removing REQID ' + thereqid);
                  let filtered = state.requests.filter( function(value, index){
                      return value.id != thereqid;
                  })
                  state.requests = filtered;
                }, DELAY * 1000)})
            .then(function(message) {
                state.message = message;
                state.mutationrunning = false;
            });
        }
        else{
            state.message = 'Maximum of 10 reached';
        }
    },
    decrement(state) {
        if (state.count > 0 ) {
            state.count--;
            state.mutationrunning = true;
            state.message = 'Decrement requested, should take ' + DELAY +  ' seconds';
            let thereqid = ++state.reqid;
            state.requests.push( { date: new Date().toString(), label: 'Decrement', id: thereqid });
            let sometasktakingtime = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve('Decrement done : now removing REQID ' + thereqid);
                    let filtered = state.requests.filter( function(value, index){
                        return value.id != thereqid;
                    })
                    state.requests = filtered;
                  }, DELAY * 1000)})
            .then(function(message) {
                state.message = message;
                state.mutationrunning = false;
            });
        }
        else {
            state.message = 'Already 0'
        }
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

