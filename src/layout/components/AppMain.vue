<template>
  <div class="app-main">
    <router-view :key="key" />
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    },
  },
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
}

</style>
