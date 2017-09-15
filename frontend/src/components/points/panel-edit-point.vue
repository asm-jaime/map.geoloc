<template>
  <div class="panel-point">
    <b-form-input type="text" placeholder="enter token"
      v-model="edit_point.token"></b-form-input>
    <small class="text-muted">change token</small>
    <b-form-select v-model="edit_point.type"
      :options="tgeoses" class="col-10"></b-form-select>
    <small vertical class="text-muted">change type point</small>

    <b-button-group class="row">
    <div class="col">
    <b-form-input type="number" step="0.01" placeholder="enter latitude"
      v-model="edit_point.latitude"></b-form-input>
    <small class="text-muted">change lat position</small>
    </div>
    <div class="col">
    <b-form-input type="number" step="0.01" placeholder="enter longitude"
      v-model="edit_point.longitude"></b-form-input>
    <small class="text-muted">change lng position</small>
    </div>
    </b-button-group>

    <div class="row justify-content-end" style="padding-right: 16px">
        <b-button ref="btn_ok" @click="putPoint" :size="lg"
          :variant="primary" href="" class="col-4">ok</b-button>
        <b-button ref="btn_del" @click="delPoint" :size="lg"
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
  name: 'EditPoint',
  data(){
    const edit_point = {
      id: '', token: '', editable: true,
      type: '', latitude: 0.0, longitude: 0.0,
    };
    return {
      edit_point,
      tgeoses: [],
    };
  },

  mounted: function() {
    this.tgeoses = types.TYPE_GEOS;

    const edit_point = this.POINTS.find((e) => e._id == this.$route.params.id);
    console.log(edit_point);
    this.edit_point.id = edit_point._id;
    this.edit_point.token = edit_point.token;
    this.edit_point.type = edit_point.location.type;
    this.edit_point.latitude = edit_point.location.coordinates[0];
    this.edit_point.longitude = edit_point.location.coordinates[1];
  },

  computed: {
    ...mapGetters([
      gets.POINTS,
    ]),
  },

  methods: {
    ...mapActions([
      acts.PST_POINT,
      acts.DEL_POINT,
    ]),
    putPoint() {
      const point = {
        _id: this.edit_point.id,
        token: this.edit_point.token,
        location:{
          type: this.NEW_POINT.type,
          coordinates: [
            parseFloat(this.NEW_POINT.longitude),
            parseFloat(this.NEW_POINT.latitude),
          ],
        }
      };
      this.PUT_POINT(point)
        .then((e) => {
          return anime.blink_good(this.$refs.btn_ok);
        })
        .then(() => {
          this.close();
        })
        .catch((e) => {
          console.log(e);
          anime.blink_err(this.$refs.btn_ok);
        })
    },
    delPoint() {
      const point = { id: this.edit_point.id };
      this.DEL_POINT(point)
        .then((e) => {
          return anime.blink_good(this.$refs.btn_del);
        })
        .then(() => {
          this.close();
        })
        .catch((e) => {
          console.log(e);
          anime.blink_err(this.$refs.btn_del);
        });
    },
    close() {
      this.$router.push({path:'/map'});
    },
  },
}
</script>

<style>
</style>
