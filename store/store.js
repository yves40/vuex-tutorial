/*----------------------------------------------------------------------------
    store.js    

    Dec 09 2018   Initial
----------------------------------------------------------------------------*/
import Vue from 'vue';
import Vuex from 'vuex';

const Version = 'store, 1.01 Dec 09 2018';

Vue.use(Vuex);

const state = {
    count: 0,
};

export const store = new Vuex.Store({
        state
    }
);
