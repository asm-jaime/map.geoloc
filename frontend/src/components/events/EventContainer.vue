<template>
    <div>
        events
        <div class="row">
            <router-link to="/events_new">
                <b-button>Create event</b-button>
            </router-link>
        </div>
        <div class="row">
            <div class="col-md-3" v-for="event in events">
                <router-link :to="'/events/'+event.id">
                    <event-card :name="event.name"
                                :description="event.description"></event-card>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
  import EventCard from './EventCard.vue'

  import {mapState} from 'vuex'

  export default {
    name: 'EventContainer',
    components: {EventCard},
    computed: {
      ...mapState('events', {
        events: state => state.events,
      })
    },
    created(){
      this.$store.dispatch('events/getEvents')
    }
  }
</script>