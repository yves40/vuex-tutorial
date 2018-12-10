/*----------------------------------------------------------------------------
    store.js    

    Dec 09 2018   Initial
    Dec 10 2018   Learn Getters, Actions, Mutations...
----------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count: 5,
    Version: 'store, 1.22 Dec 09 2018',
    message: '',
    mutationrunning: false,
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

};

// Simulate some long task
const DELAY = 5; // seconds

const mutations = { // Synchronous
    increment(state) {
        if ( state.count < 10 ){
            state.mutationrunning = true;
            state.message = 'Increment requested, should take ' + DELAY +  ' seconds';
            let sometasktakingtime = new Promise(function(resolve, reject) {
                setTimeout(function() {
                  resolve('Increment done after ' + DELAY + ' seconds');
                }, DELAY * 1000)})
            .then(function(message) {
                state.count++;
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
            state.mutationrunning = true;
            state.message = 'Decrement requested, should take ' + DELAY +  ' seconds';
            let sometasktakingtime = new Promise(function(resolve, reject) {
                setTimeout(function() {
                  resolve('Decrement done after ' + DELAY + ' seconds');
                }, DELAY * 1000)})
            .then(function(message) {
                state.count--;
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

