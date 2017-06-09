<template>
    <b-form-fieldset :feedback="feedback"
                     :state="state"

                     :for_id="for_id"
                     :horizontal="horizontal"
                     :labelSize="labelSize"
                     :enabled="enabled"
                     :label="label"
                     :description="description">
        <slot></slot>
    </b-form-fieldset>
</template>

<script>
  export default {
    computed: {
      feedback(){
        return this.errors.toString()
      },
      state(){
        return this.errors.length == 0 ? '' : 'danger'
      },
    },
    props: {
      errors: {
        type: Array,
        default: () => []
      },


      for_id: {
        type: String,
      },
      horizontal: {
        type: Boolean,
        default: false
      },
      labelSize: {
        type: Number,
        default: 6
      },
      enabled: {
        type: Boolean,
        default: true
      },
      label: {
        type: String,
        default: null
      },
      description: {
        type: String,
        default: null
      },
    }
  };
</script>
