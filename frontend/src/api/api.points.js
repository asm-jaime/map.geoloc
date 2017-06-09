import Vue from 'vue'
import VueResource from 'vue-resource'

import {POINTS as api_point} from '../constants/paths.api.js'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true
// Vue.http.options.credentials = true

export const resPoints = Vue.resource(api_point.POINTS)
export const resRndPoint = Vue.resource(api_point.RND)
export const resAllPoint = Vue.resource(api_point.ALL)
export const resNearPoint = Vue.resource(api_point.NEAR)
export const resFilterPoint = Vue.resource(api_point.FILTER)
