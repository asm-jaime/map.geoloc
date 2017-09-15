import Vue from 'vue';
import Vuex from 'vuex';

import * as acts from './constants/types.actions.js';
import * as muts from './constants/types.mutations.js';
import * as gets from './constants/types.getters.js';

import * as gen from './api/api.gens.js';

import * as api_point from './api/api.points.js';

Vue.use(Vuex);

const state = {//{{{
  my_point: {
    pic: '',
    name: '',
    text: '',
    token: '',
    editable: true,
    tobject: 'User',
    time: '',
    latitude: 0.0,
    longitude: 0.0,
  },
  point: {
    Id: '',
    Pic: '',
    Name: '',
    Text: '',
    Tags: [],
    TObject: 'User',
    Editable: true,
    lat: 0.0,
    lng: 0.0,
  },
  filter: {
    tobject: 'User',
    tgeos: 'Point',
    ttime: 'Any',
    tags: ['whoredom'],
    scope: 0,
    lng: 0,
    lat: 0,
  },
  points: [],
  error: { status: 0, message: '' },
};//}}}

const mutations = { //{{{
  [muts.SET_POINTS](state, points) {
    state.points = points;
  },
  [muts.PUT_POINT](state, point) {
    const index = state.points.findIndex((e) => e.id === point.id);
    if (index > -1) {
      state.points.splice(index, 1, point);
    } else {
      state.points.unshift(point);
    }
  },
  [muts.DEL_POINT](state, point) {
    const index = state.points.findIndex((e) => e._id === point.id);
    if (index > -1) {
      state.points.splice(index, 1);
    } else {
      console.log('can not delete point: ', point);
    }
  },

  [muts.SET_TAGS](state) {
    state.new_point.tags = gen.get_tags(state.new_point.text);
  },
  [muts.SET_FILTER](state, filter) {
    state.filter = { ...state.filter, ...filter };
  },


  [muts.CLEAN_POINTS](state) {
    state.points = [];
  },
  [muts.PUT_NEW_POINT](state, new_point) {
    state.new_point = { ...state.new_point, ...new_point };
  },
  [muts.PUT_MY_POINT](state, my_point) {
    state.my_point = { ...state.my_point, ...my_point };
  },
}; //}}}

const actions = { //{{{
  [acts.GET_POINT]({ commit }, point) {
    return api_point.resRndPoint.get({}, point).then(res => {
      // console.log('## res: ', res.data.body);
      if (res.status === 200) {
        commit(muts.PUT_POINT, res.data.body);
      } else {
        throw new Error('can\'t get this point');
      }
    });
  },
  [acts.PST_POINT]({ commit }, point) { // 
    return api_point.resPoints.save({}, point).then(res => {
      if (res.status === 200) {
        commit(muts.PUT_POINT, res.data.body);
      } else {
        throw new Error('can\'t post this point');
      }
    });
  },
  [acts.PUT_POINT]({ commit }, point) {
    return api_point.resPoints.update({}, point).then(res => {
      if (res.status === 200) {
        commit(muts.PUT_POINT, res.data.body);
      } else {
        throw new Error('can\'t post this point');
      }
    });
  },
  [acts.DEL_POINT]({ commit }, point) {
    return api_point.resPoints.remove({}, { _id: point.id }).then(res => {
      if (res.status === 200) {
        commit(muts.DEL_POINT, point);
      } else {
        throw new Error('can\'t deleted this point');
      }
    });
  },

  [acts.GET_RND_POINTS]({ commit }) {
    return api_point.resRndPoint.get().then(res => {
      if (res.status === 200) {
        commit(muts.SET_POINTS, res.data.body);
      } else {
        throw new Error('can\'t get rnd points');
      }
    });
  },
  [acts.GET_ALL_POINTS]({ commit }) {
    return api_point.resAllPoint.get().then(res => {
      if (res.status === 200) {
        commit(muts.SET_POINTS, res.data.body);
      } else {
        throw new Error('can\'t get all points');
      }
    });
  },
  [acts.GET_NEAR_POINTS]({ commit }, reqNear) {
    console.log(reqNear);
    return api_point.resNearPoint.get(reqNear).then(res => {
      if (res.status === 200) {
        commit(muts.SET_POINTS, res.data.body);
      } else {
        throw new Error('can\'t get near points');
      }
    });
  },

  [acts.SET_FILTER]({ commit }, reqFilter) {
    commit(muts.SET_FILTER, reqFilter);
  },
  [acts.GET_FILTER]({ commit }, reqFilter) {
    console.log(reqFilter);
    return api_point.resFilterPoint.get(reqFilter).then(res => {
      if (res.status === 200) {
        commit(muts.SET_POINTS, res.data.body);
      } else {
        throw new Error('can\'t get filtered points');
      }
    });
  },

  [acts.SET_TAGS]({ commit }) {
    commit(muts.SET_TAGS);
  },

  [acts.PUT_NEW_POINT]({ commit }, new_point) {
    commit(muts.PUT_NEW_POINT, new_point);
  },
  [acts.PUT_MY_POINT]({ commit }, my_point) {
    commit(muts.PUT_MY_POINT, my_point);
  },
}; //}}}

const getters = { //{{{
  [gets.POINTS](state) {
    return state.points;
  },
  [gets.NEW_POINT](state) {
    return state.new_point;
  },
  [gets.MY_POINT](state) {
    return state.my_point;
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
