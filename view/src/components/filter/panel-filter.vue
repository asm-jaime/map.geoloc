<template>
  <div class="row panel-filter">
    <div class="col" style="padding-left: 35px;">
      <filter-tag :tags="FILTER.tags"></filter-tag>
    </div>
    <b-button-group horizontal class="pull-right">
      <div class="col">
      <b-form-select :options="tobjects"
        v-model="FILTER.tobject"></b-form-select><br>
      <small class="text-muted">object</small>
      </div>
      <template v-if="FILTER.tobject === 'Event'">
      <div class="col">
      <b-form-select :options="ttimes"
        v-model="FILTER.ttime"></b-form-select><br>
      <small class="text-muted">time</small>
      </div>
      </template>
      <div class="col" style="padding-right: 31px">
        <b-btn variant="primary" @click="get_filter">get it</b-btn>
      </div>
    </b-button-group>
  </div>
</template>

<script>

import FilterTag from './filter-tag.vue';

import * as anime from '../../api/api.animation.js';

import { mapGetters, mapActions } from 'vuex';
import * as types from '../../constants/types.some.js';
import * as acts from '../../constants/types.actions.js';
import * as gets from '../../constants/types.getters.js';

export default {
  name: 'PanelFilter',
  components: {
    FilterTag,
  },
  data() {
    return {
      tobjects: [],
      ttimes: [],
    }
  },

  mounted: function() {
    this.tobjects = types.TYPE_OBJECT;
    this.ttimes = types.TYPE_TIME;
  },

  computed: {
    ...mapGetters([
      gets.FILTER,
      gets.LOCS,
    ]),
  },

  methods: {
    ...mapActions([
      acts.GET_FILTER,
    ]),
    get_filter() {
      console.log("filter: ", this.FILTER);
      this.GET_FILTER(this.FILTER)
        .then(() => {
        console.log("get filter:", this.LOCS);
      });
    },
    clear() {
    },
    close() {
      this.$router.push({ path:'/map' });
    },
    tag() {
      console.log('tags', this.tag);
    },
  },
}

</script>

<style>
  .panel-filter {
    background: #292b2c;
  }
</style>
