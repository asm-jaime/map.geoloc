import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './components/app.vue';

import MapGoogle from './components/layouts/map-google.vue';

import PanelLoc from './components/location/panel-loc.vue';
import PanelLocEdit from './components/location/panel-loc-edit.vue';
import PanelLocMe from './components/location/panel-loc-me.vue';

import store from './store.js';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

//mode: 'history: true
const router = new VueRouter({
  history: false,
  base: __dirname,
  routes: [
    {path: '/', redirect: '/map'},
    {path: '/map', component: MapGoogle, children: [
      {path: 'me', component: PanelLocMe},
      {path: ':id', component: PanelLoc},
      {path: ':id/edit',
        props: (route) => {
          return {
            tobject: route.query.tobject,
            lat: route.query.lat,
            lng: route.query.lng,
          };
        },
        component: PanelLocEdit},
      {path: 'new', component: PanelLocEdit,
        props: (route) => {
          return {
            tobject: route.query.tobject,
            lat: route.query.lat,
            lng: route.query.lng,
          };
        },
      },
    ]},
  ]
});

window.router = router;
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
