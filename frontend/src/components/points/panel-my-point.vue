<template>
  <div class="panel-point">
    <b-card class="mb-1">token: {{ MY_POINT.token }}</b-card>
    <b-card class="mb-1">type: {{ MY_POINT.type }}</b-card>
    <b-card class="mb-1">
      <div>lat: {{ MY_POINT.latitude }}</div>
      <div>lng: {{ MY_POINT.longitude }}</div>
    </b-card>
    <div v-model="MY_POINT.token"></b-card>
    </div>
    <div class="row justify-content-end" style="padding-right: 16px">
      <b-button @click="close" :size="lg"
        :variant="primary" href="" class="col-4">close</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as gets from '../../constants/types.getters.js'
import * as acts from '../../constants/types.actions.js'

export default {
  name: 'MyPoint',
  data(){//{{{
    return {
    }
  },//}}}
  mounted: function() {//{{{
    console.log(this.MY_POINT);
  },//}}}
  computed: {
    ...mapGetters([//{{{
      gets.MY_POINT,
    ]),//}}}
  },
  methods: {
    close() {//{{{
      this.$router.push({path:`/map`});
    },//}}}
  },
}
</script>

<style>
</style>
