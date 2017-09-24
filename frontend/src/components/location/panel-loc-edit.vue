<template>
  <div class="panel-loc">
    <b-form-select v-model="tobject"
      :options="tobjects" class="col-10"></b-form-select>
    <small vertical class="text-muted">type loc</small>

    <b-button-group class="row">

    <div class="col">
    <b-form-input type="number" step="0.01" placeholder="latitude"
      v-model="lat"></b-form-input>
    <small class="text-muted">change lat</small>
    </div>

    <div class="col">
    <b-form-input type="number" step="0.01" placeholder="longitude"
      v-model="lng"></b-form-input>
    <small class="text-muted">change lng</small>
    </div>

    </b-button-group>

    <div class="row justify-content-end" style="padding-right: 16px">
      <b-button ref="btn_ok" @click="put" :size="lg"
        :variant="primary" href="" class="col-4">ok</b-button>
      <b-button ref="btn_del" @click="del_loc" :size="lg"
        :variant="primary" href="" class="col-4">delete</b-button>
      <b-button @click="close" :size="lg"
        :variant="primary" href="" class="col-4">close</b-button>
    </div>
  </div>
</template>

<script>

import * as anime from '../../api/api.animation.js';

import { mapGetters, mapActions } from 'vuex';
import * as types from '../../constants/types.some.js';
import * as acts from '../../constants/types.actions.js';
import * as gets from '../../constants/types.getters.js';

export default {
  name: 'LocEdit',
  props: ['id', 'tobject', 'editable', 'lat', 'lng'],
  data(){
    return {
      put_object: { 'Event': this.PUT_EVENT, 'User': this.PUT_USER },
      tobjects: [],
    };
  },

  mounted: function() {
    this.tobjects = types.TYPE_OBJECT;
  },

  computed: {
    ...mapGetters([
      gets.LOCS,
    ]),
  },

  methods: {
    ...mapActions([
      acts.PST_LOC,
      acts.PUT_LOC,
      acts.DEL_LOC,
      acts.PST_EVENT,
      acts.PUT_EVENT,
      acts.DEL_EVENT,
      acts.PST_USER,
      acts.PUT_USER,
      acts.DEL_USER,
    ]),
    put_loc() {//{{{
      const loc = {
        _id: this.id,
        TObject: this.tobject,
        Location: {
          type: 'Point',
          coordinates: [
            parseFloat(this.lng),
            parseFloat(this.lat),
          ],
        },
      };

      console.log('put_loc: ', loc);
      /*this.PUT_LOC(loc)
        .then(() => {
          return anime.blink_good(this.$refs.btn_ok);
        })
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(err);
          anime.blink_err(this.$refs.btn_ok);
        })*/
    },//}}}
    del_loc() {
      const loc = { _id: this.id };
      this.DEL_LOC(loc)
        .then(() => {
          return anime.blink_good(this.$refs.btn_del);
        })
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(err);
          anime.blink_err(this.$refs.btn_del);
        });
    },
    put() {
      const loc = {
        _id: this.id,
        TObject: this.tobject,
        Location: {
          type: 'Point',
          coordinates: [
            parseFloat(this.lng),
            parseFloat(this.lat),
          ],
        },
      };
      this.put_object[this.tobject]();
    },
    close() {
      this.$router.push({ path:'/map' });
    },
  },
}

</script>

<style>
</style>
