import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './components/app.vue'

import EventContainer from './components/events/EventContainer.vue'
import EventShow from './components/events/EventShow.vue'
import EventNew from './components/events/EventNew.vue'
import EventEdit from './components/events/EventEdit.vue'

import MainMap from './components/layouts/main-map.vue'

import PanelPoint from './components/points/panel-point.vue'
import PanelEditPoint from './components/points/panel-edit-point.vue'
import PanelMyPoint from './components/points/panel-my-point.vue'
import PanelNewPoint from './components/points/panel-new-point.vue'

import store from './store.js'
import * as mutationsTypes from './constants/types.mutations'

Vue.use(VueRouter);
Vue.use(BootstrapVue);

//mode: 'history,
const router = new VueRouter({
  history: false,
  base: __dirname,
  routes: [
    {path: '/', component: EventContainer},

    {path: '/events', component: EventContainer},
    {path: '/events_new', component: EventNew},
    {path: '/events/:id', component: EventShow},
    {path: '/events/:id/edit', component: EventEdit},

    {path: '/map', component: MainMap, children: [
      {path: 'new', component: PanelNewPoint},
      {path: 'my', component: PanelMyPoint},
      {path: ':id', component: PanelPoint},
      {path: ':id/edit', component: PanelEditPoint},
      //{path: 'filter', component: PanelFilter},
    ]},
  ]
});

router.beforeEach((to, from, next) => {
  if(from.path == "/events_new") {
    store.commit(`events/${mutationsTypes.CLEAR_CURRENT_EVENT_ERRORS}`);
  };
  next();
});

// TODO как то засунуть это в store
window.router = router;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
