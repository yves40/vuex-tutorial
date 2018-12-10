/*----------------------------------------------------------------------------
    store.js    

    Dec 09 2018   Initial
    Dec 10 2018   Learn Getters, Actions, Mutations...
----------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';

const Version = 'store, 1.04 Dec 09 2018';

Vue.use(Vuex);

const state = {
    count: 0,
};

const getters = {
    fetchCount(state) {
        return state.count;
    }
};

const mutations = {
    increment: state => state.count++,
    decrement(state) {
        if (state.count > 0 ) {
            state.count--;
        }
    },
};

const actions = {
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement'),
};

export const store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions,
    }
);
