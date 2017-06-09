<template>
    <form v-on:submit.prevent="onSubmit">
        <fieldset-with-errors label="Name"
                              :errors="errors.name">
            <b-form-input v-model="mName"
                          placeholder="Enter name"
            ></b-form-input>
        </fieldset-with-errors>

        <fieldset-with-errors label="Description"
                              :errors="errors.description">
            <b-form-input v-model="mDescription"
                          placeholder="Enter description"
            ></b-form-input>
        </fieldset-with-errors>

        <button type="submit" class="btn btn-default">Submit</button>
    </form>
</template>

<script>
  import FieldsetWithErrors from '../shared/FieldsetWithErrors.vue'

  import {mapState} from 'vuex'

  export default{
    components: {FieldsetWithErrors},
    props: ['name', 'description', 'errors'],

    computed: {
      mName: {
        get(){
          return this.name
        },
        set (value) {
          this.$emit('updateName', value)
        }
      },
      mDescription: {
        get(){
          return this.description
        },
        set (value) {
          this.$emit('updateDescription', value)
        }
      }
    },
    methods: {
      onSubmit(){
        this.$emit('submit')
      }
    }
  }
</script>