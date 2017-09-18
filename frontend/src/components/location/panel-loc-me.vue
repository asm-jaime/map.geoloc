<template>
  <div class="panel-loc">
    <b-card class="mb-1">token: {{ LOC_ME.token }}</b-card>
    <b-card class="mb-1">type: {{ LOC_ME.type }}</b-card>
    <b-card class="mb-1">
      <div>lat: {{ LOC_ME.latitude }}</div>
      <div>lng: {{ LOC_ME.longitude }}</div>
    </b-card>
    <div v-model="LOC_ME.token"></b-card>
    </div>
    <div class="row justify-content-end" style="padding-right: 16px">
      <b-button @click="close" :size="lg"
        :variant="primary" href="" class="col-4">close</b-button>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import * as gets from '../../constants/types.getters.js';
import * as acts from '../../constants/types.actions.js';

export default {
  name: 'LocMe',
  data(){
    return {
    }
  },

  mounted: function() {
    console.log(this.LOC_ME);
  },

  computed: {
    ...mapGetters([
      gets.LOC_ME,
    ]),
  },

  methods: {
    close() {
      this.$router.push({path:'/map'});
    },
  },
}
</script>

<style>
</style>
