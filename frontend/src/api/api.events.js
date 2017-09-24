import Vue from 'vue';
import VueResource from 'vue-resource';
import {EVENTS as api_event} from '../constants/api.paths.js';

Vue.use(VueResource);
Vue.http.options.crossOrigin = true;

export const resEvents = Vue.resource(api_event.EVENT);
