import {eventsResource} from '../../api/api.events'
// TODO сделать экшен константы
// import * as actionTypes from '../../constants/types.actions'
import * as mutationsTypes from '../../constants/types.mutations'

const defaultCurrentEvent = {id: null, name: '', description: ''}
const state = {
  events: [],
  currentEvent: defaultCurrentEvent,
  currentEventErrors: {},
  loading: false,
}

// getters
// const getters = {
//   checkoutStatus: state => state.checkoutStatus
// }

// actions
const actions = {
  getEvents ({commit}) {
    commit(mutationsTypes.GET_EVENTS_REQUEST)
    eventsResource.query().then(response => {
      commit(mutationsTypes.GET_EVENTS_SUCCESS, response.body)
    })
  },

  getEvent ({commit}, id) {
    commit(mutationsTypes.GET_EVENT_REQUEST)
    eventsResource.get({id: id}).then(response => {
      commit(mutationsTypes.GET_EVENT_SUCCESS, response.body)
    })
  },

  createEvent ({commit}, event) {
    commit(mutationsTypes.CREATE_EVENT_REQUEST)
    eventsResource.save({id: event.id}, {event: event}).then(response => {
      commit(mutationsTypes.CREATE_EVENT_SUCCESS, response)
      // console.log('post', response)
      window.router.push(`/events/${response.body.id}`)
    }, error => {
      commit(mutationsTypes.CREATE_EVENT_FAILURE, error)
    })
  },

  updateEvent ({commit}, event) {
    commit(mutationsTypes.UPDATE_EVENT_REQUEST)
    eventsResource.update({id: event.id}, {event: event}).then(response => {
      commit(mutationsTypes.UPDATE_EVENT_SUCCESS, response)
      window.router.push(`/events/${response.body.id}`)
    }, error => {
      commit(mutationsTypes.UPDATE_EVENT_FAILURE, error)
    })
  }
}


function clearCurrentEventErrors(state) {
  state.currentEventErrors = {}
}

const mutations = {
  [mutationsTypes.CHANGE_CURRENT_EVENT] (state, event) {
    state.currentEvent = event
  },

  [mutationsTypes.CLEAR_CURRENT_EVENT_ERRORS] (state) {
    clearCurrentEventErrors(state)
  },

  [mutationsTypes.GET_EVENTS_REQUEST] (state) {
    state.loading = true
    state.events = {}
  },

  [mutationsTypes.GET_EVENTS_SUCCESS] (state, events) {
    state.loading = false
    state.events = events
  },

  [mutationsTypes.GET_EVENT_REQUEST] (state) {
    state.loading = true
    state.currentEvent = defaultCurrentEvent
  },

  [mutationsTypes.GET_EVENT_SUCCESS] (state, event) {
    state.loading = false
    state.currentEvent = event
  },


  [mutationsTypes.CREATE_EVENT_REQUEST] (state) {
    state.loading = true
    clearCurrentEventErrors(state)
  },

  [mutationsTypes.CREATE_EVENT_SUCCESS] (state, event) {
    state.loading = false
  },

  [mutationsTypes.CREATE_EVENT_FAILURE] (state, errors) {
    state.loading = false
    state.currentEventErrors = errors.body || {}
  },

  [mutationsTypes.UPDATE_EVENT_REQUEST] (state) {
    state.loading = true
    clearCurrentEventErrors(state)
  },

  [mutationsTypes.UPDATE_EVENT_SUCCESS] (state, event) {
    state.loading = false
  },

  [mutationsTypes.UPDATE_EVENT_FAILURE] (state, errors) {
    state.loading = false
    state.currentEventErrors = errors.body || {}
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}