<template>
    <div>
        <b-button>
            <router-link to="/events">
                Back
            </router-link>
        </b-button>
        <b-button>
            <router-link :to="'/events/'+$route.params.id+'/edit'">
                Edit
            </router-link>
        </b-button>
        id = {{ $route.params.id }}
        <hr>
        <event-card :name="name"
                    :description="description"></event-card>

    </div>
</template>

<script>
  import EventCard from './EventCard.vue'

  import {mapState} from 'vuex'

  export default{
    components: {EventCard},

    computed: {
      ...mapState('events', {
        name: state => state.currentEvent.name,
        description: state => state.currentEvent.description,
      })
    },
    created(){
      this.$store.dispatch('events/getEvent', this.$route.params.id)
    }
  }
</script>