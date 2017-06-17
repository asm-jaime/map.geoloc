<template>
  <div id="app">
    <div class="main-panel">
      <b-navbar toggleable type="inverse"
        variant="inverse" class="dvi-navbar collapse">
        <b-collapse isNav id="nav_collapse">
          <div class="row">
            <div style="padding-left: 20px">
              <img height="42" width="42" src="logo.png"></img>
            </div>
            <div class="col">
            <b-nav isNavBar>
              <router-link to="/">
                <b-nav-item>home</b-nav-item>
              </router-link>
              <router-link to="/events">
                <b-nav-item>events</b-nav-item>
              </router-link>
              <router-link to="/map">
                <b-nav-item>map</b-nav-item>
              </router-link>
            </b-nav>
            </div>
            <div class="col pull-right">
              <b-btn v-b-toggle.filter variant="primary">
                filter
              </b-btn>
              <b-btn variant="primary">
                login
              </b-btn>
            </div>
          </div>
        </b-collapse>
      </b-navbar>
      <b-collapse id="filter">
        <panel-filter></panel-filter>
      </b-collapse>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import PanelFilter from './general/panel-filter.vue'

export default {
  components: { PanelFilter },
}
</script>

<style>
  html,
  body {}
  .main-panel {
    width: 100%;
    /*position: absolute;*/
    z-index: 2;
  }
</style>
