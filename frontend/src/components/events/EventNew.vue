<template>
    <div>
        <b-button>
            <router-link to="/events">
                Back
            </router-link>
        </b-button>
        <hr>
        <event-form v-on:submit="onSubmit"
                    v-on:updateName="updateName"
                    v-on:updateDescription="updateDescription"
                    :name="event.name"
                    :description="event.description"
                    :errors="errors"
        ></event-form>

    </div>
</template>

<script>
  import WithEventForForm from './mixins/WithEventForForm.js'

  export default{
    mixins: [WithEventForForm],

    methods: {
      onSubmit(){
        this.$store.dispatch('events/createEvent', this.event)
      }
    }
  }
</script>