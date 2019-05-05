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
      <b-button ref="btn_ok" @click="put_object[tobject]" :size="lg"
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
  data(){//{{{
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
    const event = {
      _id: '', name: '', text: '',
      tags: [],
    };
    const user = {
      _id: '', name: '', text: '',
      tags: [],
    };
    return {
      put_object: { 'Event': this.put_event, 'User': this.put_user },
      tobjects: [],
      event,
      user,
      loc,
    };
  },//}}}

  mounted: function() {
    this.tobjects = types.TYPE_OBJECT;
  },

  computed: {
    ...mapGetters([
      gets.LOCS,
    ]),
  },

  methods: {
    ...mapActions([//{{{
      acts.PST_LOC,
      acts.PUT_LOC,
      acts.DEL_LOC,
      acts.PST_EVENT,
      acts.PUT_EVENT,
      acts.DEL_EVENT,
      acts.PST_USER,
      acts.PUT_USER,
      acts.DEL_USER,
    ]),//}}}
    del_loc() {//{{{
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
    },//}}}
    put_event() {
      this.PUT_EVENT(this.event)
        .then((res) => {
          const loc = this.loc;
          loc._id = res._id;
          console.log('loc: ',loc);
          return this.PUT_LOC(loc);
        })
        .then((res) => {
          console.log('put_loc: ', res);
        })
        .catch((err) => {
          console.log(err);
        })
      //console.log(this.loc);
    },
    put_user() {
      console.log(this.user);
    },
    close() {
      this.$router.push({ path:'/map' });
    },
  },
}

</script>

<style>
</style>
