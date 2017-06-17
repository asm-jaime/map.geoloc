import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './components/app.vue'

import MainMap from './components/layouts/main-map.vue'

import PanelPoint from './components/points/panel-point.vue'
import PanelEditPoint from './components/points/panel-edit-point.vue'
import PanelMyPoint from './components/points/panel-my-point.vue'
import PanelNewPoint from './components/points/panel-new-point.vue'

import store from './store.js'

Vue.use(VueRouter);
Vue.use(BootstrapVue);

//mode: 'history: true
const router = new VueRouter({
  history: false,
  base: __dirname,
  routes: [
    {path: '/', redirect: '/map'},
    {path: '/map', component: MainMap, children: [
      {path: 'new', component: PanelNewPoint},
      {path: 'my', component: PanelMyPoint},
      {path: ':id', component: PanelPoint},
      {path: ':id/edit', component: PanelEditPoint},
    ]},
  ]
});

window.router = router;
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
