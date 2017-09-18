import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const eventsResource = Vue.resource('http://localhost:3000/api/v1/events/{id}');
export { eventsResource };
