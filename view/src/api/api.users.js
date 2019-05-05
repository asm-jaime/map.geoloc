import Vue from 'vue';
import VueResource from 'vue-resource';
import {USERS as api_user} from '../constants/api.paths.js';

Vue.use(VueResource);
Vue.http.options.crossOrigin = true;

export const resUsers = Vue.resource(api_user.USER);
