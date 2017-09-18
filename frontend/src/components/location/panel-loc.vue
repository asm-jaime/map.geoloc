<template>
  <div class="panel-loc">
    <b-card class="mb-1">id: {{ this.id }}</b-card>
    <b-card class="mb-1">type: {{ this.tobject }}</b-card>
    <b-card class="mb-1">
      <div>lat: {{ this.lat }}</div>
      <div>lng: {{ this.lng }}</div>
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
  props: ['id', 'tobject', 'lat', 'lng'],
  watch: {
    $route() {
      this.show_loc();
    }
  },

  mounted: function() {
    this.show_loc();
  },

  computed: {
    ...mapGetters([
      gets.LOCS,
    ]),
  },

  methods: {
    show_loc() {
      this.get_loc()
        .then(this.set_loc)
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            this.get_loc().then(this.set_loc);
          }, 3000);
        })
    },
    get_loc() {
      return new Promise((resolve, rejected) => {
        const loc = this.LOCS.find((elem) => {
          return elem.Id == this.$route.params.id;
        });
        console.log(loc);
        if(loc) {
          resolve(loc);
          return;
        }
        rejected('cannot get loc');
      });
    },
    set_loc(loc) {
      this.id = loc.Id;
      this.tobject = loc.TObject;
      this.editable = true;
      this.lat = loc.Location.coordinates[0];
      this.lng = loc.Location.coordinates[1];
    },
    edit_loc() {
      this.$router.push({
        path: `/map/${this.$route.params.id}/edit?`+
          `tobject=${this.loc.tobject}&`+
          `lat=${this.loc.lat}&lng=${this.loc.lng}`,
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
