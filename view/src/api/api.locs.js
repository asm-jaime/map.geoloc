import Vue from 'vue';
import VueResource from 'vue-resource';

import {LOCS as api_loc} from '../constants/api.paths.js';

Vue.use(VueResource);

Vue.http.options.crossOrigin = true;
// Vue.http.options.credentials = true

export const resLocs = Vue.resource(api_loc.LOC);
export const resRndLoc = Vue.resource(api_loc.RND);
export const resAllLoc = Vue.resource(api_loc.ALL);
export const resNearLoc = Vue.resource(api_loc.NEAR);
export const resFilterLoc = Vue.resource(
  `${api_loc.FILTER}?tobject={tobject}&tgeos={tgeos}
  &ttime={ttime}&tags={tags*}&scope={scope}&lng={lng}&lat={lat}`
);
