<template>
  <div class="panel-point">

    <div class="container">
    <b-form-input textarea type="text" placeholder="enter text"
      v-model="NEW_POINT.text" @blur="setTags"></b-form-input>
    <small class="text-muted">text</small>
    </div>

    <div class="container">
      <b-form-select v-model="NEW_POINT.tobject"
        :options="tobject" class="col"></b-form-select>
      <small class="text-muted">type object</small>
    </div>

    <div class="container">
    <pic-zone class="col"></pic-zone>
    </div>

    <div class="container">
      <div class="row">
      <div class="col">
      <small class="text-muted">tags: {{ NEW_POINT.tags }}</small>
      </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
      <div class="col">
      <small class="text-muted">lat: {{ NEW_POINT.latitude }}</small>
      </div>
      <div class="col">
      <small class="text-muted">lng: {{ NEW_POINT.longitude }}</small>
      </div>
      </div>
    </div>

    <div class="container">
    <div class="row justify-content-end" style="padding-right: 16px">
      <b-button ref="btn_ok" @click="postNewPoint" :size="lg"
        :variant="primary" href="" class="col-4">ok</b-button>
      <b-button @click="close" :size="lg"
        :variant="primary" href="" class="col-4 show-blinking">close</b-button>
    </div>
    </div>

  </div>
</template>

<script>
import PicZone from '../general/pic-zone.vue'

import * as anime from '../../api/api.animation.js'

import { mapGetters, mapActions } from 'vuex'
import * as types from '../../constants/types.some.js'
import * as acts from '../../constants/types.actions.js'
import * as gets from '../../constants/types.getters.js'

export default {
  name: 'NewPoint',
  components: {//{{{
    PicZone,
  },//}}}
  data(){//{{{
    return {
      tobject: [],
    }
  },//}}}
  computed: {
    ...mapGetters([//{{{
      gets.NEW_POINT,
    ]),//}}}
  },
  mounted: function() {//{{{
    this.tobject = types.TYPE_OBJECT;
  },//}}}
  methods: {
    ...mapActions([//{{{
      acts.PST_POINT,
      acts.SET_TAGS,
    ]),//}}}
    postNewPoint() {//{{{
      console.log(this.NEW_POINT);
      const point = {
        token: this.NEW_POINT.token,
        location:{
          type: this.NEW_POINT.type,
          coordinates: [
            parseFloat(this.NEW_POINT.longitude),
            parseFloat(this.NEW_POINT.latitude),
          ],
        }
      };
      console.log('post');
      this.PST_POINT(point)
        .then((e)=>{
          return anime.blink_good(this.$refs.btn_ok);
        })
        .then(()=>{
          this.close();
        })
        .catch(e => {
          console.log(e);
          anime.blink_err(this.$refs.btn_ok);
        })
    },//}}}
    close() {//{{{
      this.$router.push({path:`/map`});
    },//}}}
    setTags() {//{{{
      this.SET_TAGS();
    },//}}}
  },
}
</script>

<style>
</style>
