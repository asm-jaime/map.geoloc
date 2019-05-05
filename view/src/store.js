import Vue from 'vue';
import Vuex from 'vuex';

import * as acts from './constants/types.actions.js';
import * as muts from './constants/types.mutations.js';
import * as gets from './constants/types.getters.js';

import * as gen from './api/api.gens.js';

import * as api_loc from './api/api.locs.js';
import * as api_user from './api/api.users.js';
import * as api_event from './api/api.events.js';

Vue.use(Vuex);

const state = {//{{{
  loc_me: {
    id: '',
    tobject: 'User',
    lat: 0.0, lng: 0.0,
    editable: true,
  },
  filter: {
    tgeos: '',
    tobject: 'Any',
    ttime: 'Any',
    scope: 0,
    tags: [],
    lng: 0, lat: 0,
  },
  locs: [],
  error: { status: 0, message: '' },
};//}}}

const mutations = { //{{{
  [muts.SET_LOCS](state, locs) {
    state.locs = locs;
  },
  [muts.PUT_LOC](state, loc) {
    if(state.locs === null) state.locs = [];
    const index = state.locs.findIndex((elem) => elem._id === loc._id);
    if (index > -1) {
      state.locs.splice(index, 1, loc);
    } else {
      state.locs.unshift(loc);
    }
  },
  [muts.DEL_LOC](state, loc) {
    const index = state.locs.findIndex((elem) => elem._id === loc._id);
    if (index > -1) {
      state.locs.splice(index, 1);
    } else {
      console.log('can not delete loc: ', loc);
    }
  },

  [muts.SET_TAGS](state) {
    state.loc_new.tags = gen.get_tags(state.loc_new.text);
  },
  [muts.SET_FILTER](state, filter) {
    state.filter = { ...state.filter, ...filter };
  },

  [muts.CLEAN_LOCS](state) {
    state.locs = [];
  },
  [muts.PUT_LOC_ME](state, loc_me) {
    state.loc_me = { ...state.loc_me, ...loc_me };
  },
}; //}}}

const actions = { //{{{
  [acts.GET_LOC]({ commit }, loc) {
    return api_loc.resRndLoc.get({}, loc).then((res) => {
      // console.log('## res: ', res.data.body);
      if (res.status === 200) {
        commit(muts.PUT_LOC, res.data.body);
      } else {
        throw new Error('can\'t get this loc');
      }
    });
  },
  [acts.PST_LOC]({ commit }, loc) {
    return api_loc.resLocs.save({}, loc).then((res) => {
      if (res.status === 200) {
        commit(muts.PUT_LOC, res.data.body);
      } else {
        throw new Error('can\'t post this loc');
      }
    });
  },
  [acts.PUT_LOC]({ commit }, loc) {
    return api_loc.resLocs.update({}, loc).then((res) => {
      if (res.status === 200) {
        commit(muts.PUT_LOC, res.data.body);
      } else {
        throw new Error('can\'t post this loc');
      }
    });
  },
  [acts.DEL_LOC]({ commit }, loc) {
    return api_loc.resLocs.remove({}, loc).then((res) => {
      if (res.status === 200) {
        commit(muts.DEL_LOC, loc);
      } else {
        throw new Error('can\'t deleted this loc');
      }
    });
  },

  [acts.GET_LOC_RND]({ commit }) {
    return api_loc.resRndLoc.get().then((res) => {
      if (res.status === 200) {
        commit(muts.SET_LOCS, res.data.body);
      } else {
        throw new Error('can\'t get rnd locs');
      }
    });
  },
  [acts.GET_LOC_ALL]({ commit }) {
    return api_loc.resAllLoc.get().then((res) => {
      if (res.status === 200) {
        commit(muts.SET_LOCS, res.data.body);
      } else {
        throw new Error('can\'t get all locs');
      }
    });
  },
  [acts.GET_LOC_NEAR]({ commit }, near) {
    // console.log(near);
    return api_loc.resNearLoc.get(near).then((res) => {
      if (res.status === 200) {
        commit(muts.SET_LOCS, res.data.body);
      } else {
        throw new Error('can\'t get near locs');
      }
    });
  },

  [acts.PUT_USER]({ commit }, user) {
    return api_user.resUsers.update({}, user).then((res) => {
      if (res.status === 200) {

        console.log('put user complete: ', res.data.body);
        return res.data.body;
      } else {
        throw new Error('can\'t post user');
      }
    });
  },

  [acts.PUT_EVENT]({ commit }, event) {
    return api_event.resEvents.update({}, event).then((res) => {
      if (res.status === 200) {
        console.log('put user complete: ', res.data.body);
        return res.data.body;
      } else {
        throw new Error('can\'t post user');
      }
    });
  },

  [acts.SET_FILTER]({ commit }, filter) {
    commit(muts.SET_FILTER, filter);
  },
  [acts.GET_FILTER]({ commit }, filter) {
    console.log('acts.GET_FILTER: ', filter);
    return api_loc.resFilterLoc.get(filter).then((res) => {
      if (res.status === 200) {
        commit(muts.SET_LOCS, res.data.body);
      } else {
        throw new Error('can\'t get filter');
      }
    });
  },
  [acts.SET_TAGS]({ commit }) {
    commit(muts.SET_TAGS);
  },
  [acts.PUT_LOC_ME]({ commit }, loc_me) {
    commit(muts.PUT_LOC_ME, loc_me);
  },
}; //}}}

const getters = { //{{{
  [gets.LOCS](state) {
    if(state.locs === null) state.locs = [];
    return state.locs;
  },
  [gets.LOC_ME](state) {
    return state.loc_me;
  },
  [gets.FILTER](state) {
    return state.filter;
  },
}; //}}}

export default new Vuex.Store({//{{{
  state,
  getters,
  actions,
  mutations
});//}}}