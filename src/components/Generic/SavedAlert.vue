<template>
  <v-alert class="saved-alert" type="success" text transition="fade-transition" :value="value">{{message}}</v-alert>
</template>

<script>
export default {
  name: "SavedAlert",
  props: {
    value: {
      type: Boolean,
      default: false,
      required: false,
    },
    message: {
      type: String,
      default: 'saved',
      required: false,
    },

  }
}
</script>