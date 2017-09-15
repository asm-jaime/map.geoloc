<template>
  <div class="panel-point">
    <b-card class="mb-1">id: {{ point.Id }}</b-card>
    <b-card class="mb-1">token: {{ point.Text }}</b-card>
    <b-card class="mb-1">type: {{ point.Location.type }}</b-card>
    <b-card class="mb-1">
      <div>lat: {{ point.Location.coordinates[0] }}</div>
      <div>lng: {{ point.Location.coordinates[1] }}</div>
    </b-card>
    <div class="row justify-content-end" style="padding-right: 16px">
        <b-button @click="edit" :size="lg"
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
  name: 'Point',
  watch: {
    $route() {
      this.show_point();
    }
  },

  data(){
    let point = {
      Id: 'no id', Name: 'no name',
      TObject: 'no object', Tags: [], Text: 'no text',
      Location: { type: 'no type', coordinates: [ 0.00001, 0.00001 ] },
    };
    return {
      point,
    }
  },

  mounted: function() {
    this.show_point();
  },

  computed: {
    ...mapGetters([
      gets.POINTS,
    ]),
  },

  methods: {
    show_point() {
      const point = this.POINTS.find((item) => item.Id == this.$route.params.id);
      if (point) { this.point = point } else {
        setTimeout(()=>{
          const point = this.POINTS.find((item) => item.Id == this.$route.params.id);
          if (point) { this.point = point };
        }, 3000);
      };
    },
    edit() {
      this.$router.push({path:`/map/${this.$route.params.id}/edit`});
    },
    close() {
      this.$router.push({path:'/map'});
    },
  },
}
</script>

<style>
</style>
