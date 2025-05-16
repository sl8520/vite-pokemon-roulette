<template>
  <div class="app-wrapper">
    <app-main />
  </div>
</template>

<script>
import AppMain from './components/AppMain.vue'

export default {
  name: 'Layout',
  components: {
    AppMain,
  },
}
</script>
