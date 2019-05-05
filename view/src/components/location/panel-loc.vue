<template>
  <div class="panel-loc">
    <b-card class="mb-1">id: {{ id }}</b-card>
    <b-card class="mb-1">type: {{ tobject }}</b-card>
    <b-card class="mb-1">
      <div>lng: {{ lng }}</div>
      <div>lat: {{ lat }}</div>
    </b-card>
    <div class="row justify-content-end" style="padding-right: 16px">
      <b-button @click="edit_loc" :size="lg"
        :variant="primary" href="" class="col-4">edit</b-button>
      <b-button @click="close" :size="lg"
        :variant="primary" href="" class="col-4">close</b-button>
    </div>
    </div>
  </div>
</template>

<script>

import * as gets from '../../constants/types.getters.js';
import * as acts from '../../constants/types.actions.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Loc',
  props: ['id', 'tobject', 'lng', 'lat'],

  mounted: function() {
  },

  computed: {
    ...mapGetters([
      gets.LOCS,
    ]),
  },

  methods: {
    edit_loc() {
      this.$router.push({
        path: `/map/${this.$route.params.id}/edit?`+
              `tobject=${this.tobject}&lng=${this.lng}&lat=${this.lat}`,
      });
    },
    close() {
      this.$router.push({ path:'/map' });
    },
  },
}

</script>

<style>
</style>
