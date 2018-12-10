/*----------------------------------------------------------------------------
    store.js    

    Dec 09 2018   Initial
    Dec 10 2018   Learn Getters, Actions, Mutations...
----------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count: 0,
    Version: 'store, 1.08 Dec 09 2018',
    message: '',
};

const getters = {
    fetchCount(state) {
        return state.count;
    },
    getVersion(state) {
        return 'Store version is : ' + state.Version;
    },
    getStatus(state) {
        return state.message;
    },
};

const mutations = {
    increment(state) {
        if ( state.count < 10 ){
            state.count++;
            state.message = '';
        }
        else{
            state.message = 'Maximum of 10 reached';
        }
    },
    decrement(state) {
        if (state.count > 0 ) {
            state.count--;
            state.message = '';
        }
        else {
            state.message = 'Already 0'
        }
    },
};

const actions = {
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
