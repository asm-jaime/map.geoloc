import EventForm from './../EventForm.vue'

import {mapState} from 'vuex'
import * as mutationsTypes from '../../../constants/types.mutations'

export default {
  components: {EventForm},

  computed: {
    ...mapState('events', {
      event: state => state.currentEvent,
      errors: state => state.currentEventErrors,
    })
  },
  methods: {
    onSubmit(){
      this.$store.dispatch('events/updateEvent', this.event)
    },
    updateName(name){
      this.$store.commit(`events/${mutationsTypes.CHANGE_CURRENT_EVENT}`, {...this.event, name: name})
    },
    updateDescription(description){
      this.$store.commit(`events/${mutationsTypes.CHANGE_CURRENT_EVENT}`, {...this.event, description: description})
    }
  }
}