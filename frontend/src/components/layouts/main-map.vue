<template>
  <div>
  <div class="google-map" id="map"></div>
  <router-view class="view"></router-view>
  </div>
</template>

<script>
  import loadGoogleMapsAPI from 'load-google-maps-api';
  import API_KEY from '../../constants/settings.js'

  import { mapGetters, mapActions } from 'vuex'
  import * as gets from '../../constants/types.getters.js'
  import * as acts from '../../constants/types.actions.js'

  // import api_points from '../components/api.points';
  export default {
    watch: {
      POINTS: function(){
        //this.clearPoints();
        setTimeout(() => this.reShowPoints(), 500);
      },
    },
    data(){//{{{
      const markers = [];
      let new_marker = {};
      let my_marker = {};
      return {
        new_marker,
        my_marker,
        markers,
      }
    },//}}}
    mounted: function() {//{{{
      this.clearPoints();
      this.markers = [];
      console.log('markers: ',this.markers);
      loadGoogleMapsAPI({key: API_KEY}).then((googleMaps) => {
        return
      }).then(() => {
        navigator.geolocation.getCurrentPosition(this.initPosMap, this.initNoPosMap);
        //return this.GET_NEAR_POINTS();
      //}).then(() => {
        //console.log(this.POINTS);
        //setTimeout(() => this.drawPoints(), 1000);
      });
    },//}}}
    computed: {
      ...mapGetters([//{{{
        gets.POINTS,
        gets.FILTER,
      ]),//}}}
    },
    methods: {
      ...mapActions([//{{{
        acts.GET_ALL_POINTS,
        acts.GET_RND_POINTS,
        acts.GET_NEAR_POINTS,
        acts.GET_FILTER,
        acts.SET_FILTER,
        acts.PUT_MY_POINT,
        acts.PUT_NEW_POINT,
      ]),//}}}
      drawPoints: function(){//{{{
        let points = this.POINTS;
        //console.log('draw: ', points);
        for(let i = 0; i < points.length; i++){
          let marker = new google.maps.Marker({
            id: points[i]._id,
            //title: points[i].token,
            position: {
              lng: points[i].location.coordinates[0],
              lat: points[i].location.coordinates[1]
            },
            draggable: false,
            //animation: google.maps.Animation.BOUNCE,
            animation: google.maps.Animation.mo,
            map: this.map,
          });
          console.log(points[i]);
          console.log(marker);

          if(points[i].editable) {
            marker.addListener('click',
              () => this.$router.push({path:`/map/${points[i]._id}/edit`}));
          } else {
            marker.addListener('click',
              () => this.$router.push({path:`/map/${points[i]._id}`}));
          };
          this.markers.push(marker);
        };
      },//}}}
      reDrawPoints: function(){//{{{
        const points = this.POINTS;
        //this.markers = [];
        //console.log('redrawed: ', points);
        //console.log('markered: ', this.markers);
        //console.log('rw: ', points);
        if(points === null || points === undefined) {
          return;
        };
        // set new points to map
        for(let i = 0; i < points.length; i++){
          if(this.markers.find((e, num) => e.id === points[i]._id)) {
            continue;
          };
          console.log('redraw: ', points[i]._id);
          setTimeout(()=> {
            const marker = new google.maps.Marker({
              id: points[i]._id,
              position: {
                lng: points[i].location.coordinates[0],
                lat: points[i].location.coordinates[1]
              },
              draggable: false,
              animation: google.maps.Animation.DROP,
              //animation: google.maps.Animation.mo,
              map: this.map,
            });
            if(points[i].editable) {
              marker.addListener('click',
                () => this.$router.push({path:`/map/${points[i]._id}/edit`}));
            } else {
              marker.addListener('click',
                () => this.$router.push({path:`/map/${points[i]._id}`}));
            };
            this.markers.push(marker);
          }, 1000*i);
        };
      },//}}}
      reShowPoints: function(){//{{{
        const points = this.POINTS;
        for(let i = 0; i < this.markers.length; i++){
          this.markers[i].setMap(null);
        };
        this.markers = [];
        if(points === null || points === undefined) {
          return;
        };
        // set points to map
        for(let i = 0; i < points.length; i++){
          setTimeout(()=> {
            const marker = new google.maps.Marker({
              id: points[i]._id,
              position: {
                lng: points[i].Location.coordinates[0],
                lat: points[i].Location.coordinates[1]
              },
              draggable: false,
              //animation: google.maps.Animation.DROP,
              animation: google.maps.Animation.mo,
              map: this.map,
            });
            if(points[i].editable) {
              marker.addListener('click',
                () => this.$router.push({path:`/map/${points[i]._id}/edit`}));
            } else {
              marker.addListener('click',
                () => this.$router.push({path:`/map/${points[i]._id}`}));
            };
            this.markers.push(marker);
          }, 10*i);
        };
      },//}}}
      clearPoints: function(){//{{{
        for(let i = 0; i < this.markers.length; i++){
          this.markers[i].setMap(null);
        };
      },//}}}
      initPosMap: function(pos){//{{{
        //console.log('pos: ',pos.coords);
        //this.markers = [];
        const my_point = {
          editable: true,
          name: 'it\'s me',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        this.PUT_MY_POINT(my_point);

        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          disableDefaultUI: true,
        });
        this.map = map;

        google.maps.event.addListener(map, 'click', this.addMarkerOnClick);
        this.addMyMarker(my_point);
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
            console.log(this.POINTS);
          });
        });
      },//}}}
      addMarkerOnClick: function(e){//{{{
        const new_point = {
          name: 'something',
          editable: true,
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        };
        this.PUT_NEW_POINT(new_point);
        this.addNewMarker(new_point);
        this.$router.push({ path: `/map/new` });
      },//}}}
      addMyMarker: function(my_point){//{{{
        console.log('## my point marker');
        const marker = new google.maps.Marker({
          title: my_point.name,
          position: { lat: my_point.latitude, lng: my_point.longitude },
          draggable: false,
          animation: google.maps.Animation.mo,
          map: this.map,
        });
        marker.addListener('click', () => this.$router.push({path:`/map/my`}));
        this.my_marker = marker;
      },//}}}
      addNewMarker: function(new_point){//{{{
        if(Object.keys(this.new_marker).length > 0) {
          this.new_marker.setMap(null);
        }
        const marker = new google.maps.Marker({
          position: { lat: new_point.latitude, lng: new_point.longitude },
          title: new_point.name,
          draggable: true,
          animation: google.maps.Animation.mo,
          map: this.map,
        });
        marker.addListener('click', () => this.$router.push({path:`/map/new`}));
        this.new_marker = marker;
      },//}}}
    }
  }
</script>

<style>
/* {{{ */
  html,
  body {
  }
  .google-map {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
  }

  .debug-panel {
    width: 300px;
    height: 300px;
    top: 20%;
    right: 1%;
    position: absolute;
    float: right;
    z-index: 2;
    background: azure;
  }

  .element-panel {
    width: 300px;
    height: 300px;
    top: 100px;
    left: 1%;
    position: absolute;
    float: right;
    z-index: 2;
    background: azure;
  }
/* }}} */
</style>
