<template>
  <div>
  <div class="map-google" id="map"></div>
  <router-view class="view"></router-view>
  </div>
</template>

<script>

import loadGoogleMapsAPI from 'load-google-maps-api';
import API_KEY from '../../constants/settings.js'

import { mapGetters, mapActions } from 'vuex'
import * as gets from '../../constants/types.getters.js'
import * as acts from '../../constants/types.actions.js'

export default {
  watch: {
    LOCS: function() {
      setTimeout(() => this.show_locs(), 500);
    },
  },

  data(){
    let markers = [];
    let marker_new = {};
    let marker_me = {};
    return {
      marker_new,
      marker_me,
      markers,
    }
  },

  mounted: function() {
    this.clear_markers();
    this.markers = [];
    console.log('markers: ',this.markers);

    // load map and set current position only when map is loaded
    loadGoogleMapsAPI({key: API_KEY}).then((googleMaps) => {
      return;
    }).then(() => {
      navigator.geolocation.getCurrentPosition(this.init_map, this.init_map_err);
    });
  },

  computed: {
    ...mapGetters([
      gets.LOCS,
      gets.FILTER,
    ]),
  },

  methods: {
    ...mapActions([
      acts.GET_LOC_ALL,
      acts.GET_LOC_RND,
      acts.GET_LOC_NEAR,
      acts.PUT_LOC_ME,
      acts.PUT_LOC_NEW,
      acts.GET_FILTER,
      acts.SET_FILTER,
    ]),

    show_locs: function() {
      const locs = this.LOCS;
      for(let i = 0; i < this.markers.length; i++){
        this.markers[i].setMap(null);
      }
      this.markers = [];
      if(locs === null || locs === undefined) {
        return;
      }

      // set locs to map
      for(let i = 0; i < locs.length; i++){
        setTimeout(()=> {
          const marker = new google.maps.Marker({
            id: locs[i].Id,
            position: {
              lng: locs[i].Location.coordinates[0],
              lat: locs[i].Location.coordinates[1]
            },
            draggable: false,
            //animation: google.maps.Animation.DROP,
            animation: google.maps.Animation.mo,
            map: this.map,
          });
          if(locs[i].editable) {
            marker.addListener('click',
              () => this.$router.push({path:`/map/${locs[i].Id}/edit`}));
          } else {
            marker.addListener('click',
              () => this.$router.push({path:`/map/${locs[i].Id}`}));
          };
          this.markers.push(marker);
        }, 10*i);
      }
    },

    clear_markers: function() {
      for(let i = 0; i < this.markers.length; i++){
        this.markers[i].setMap(null);
      }
    },

    init_map: function(pos) {
      const loc_me = {
        editable: true,
        name: 'it\'s me',
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
      this.PUT_LOC_ME(loc_me);

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        disableDefaultUI: true,
      });
      this.map = map;

      google.maps.event.addListener(map, 'click', this.add_marker);
      this.add_marker_me(loc_me);
      map.addListener('idle', () => {
        const bounds = this.map.getBounds();
        const center = this.map.getCenter();
        const scope = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();

        const reqFilter = {
          scope: Math.floor(100000*scope),
          lng: center.lng(),
          lat: center.lat(),
        };
        this.SET_FILTER(reqFilter).then(() => {
          return this.GET_FILTER(this.FILTER);
        }).then(() => {
          console.log(this.LOCS);
        });
      });
    },

    add_marker: function(elem) {
      const loc_new = {
        lat: elem.latLng.lat(),
        lng: elem.latLng.lng(),
      };
      this.PUT_LOC_NEW(loc_new);
      this.add_marker_new(loc_new);

      this.$router.push({
        path: `/map/new/?tobject=Event&lat=${loc_new.lat}&lng=${loc_new.lng}`
      });
    },

    add_marker_me: function(loc_me) {
      console.log('## my loc marker');
      const marker = new google.maps.Marker({
        title: loc_me.name,
        position: { lat: loc_me.latitude, lng: loc_me.longitude },
        draggable: false,
        animation: google.maps.Animation.mo,
        map: this.map,
      });
      marker.addListener('click', () => this.$router.push({ path:'/map/me' }));
      this.marker_me = marker;
    },

    add_marker_new: function(loc_new) {
      if(Object.keys(this.marker_new).length > 0) {
        this.marker_new.setMap(null);
      }

      const marker = new google.maps.Marker({
        position: { lat: loc_new.lat, lng: loc_new.lng },
        draggable: true,
        animation: google.maps.Animation.mo,
        map: this.map,
      });
      marker.addListener('click', () => this.$router.push({
        path:`/map/new/?tobject=Event&lat=${loc_new.lat}&lng=${loc_new.lng}`
      }));

      this.marker_new = marker;
    },
  },
}

</script>

<style>
</style>
