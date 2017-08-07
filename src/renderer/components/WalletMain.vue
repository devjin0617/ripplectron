<template>
  <div>
    <div class="wrapper">
      <navigation-bar></navigation-bar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar'

export default {
  name: 'wallet-main',
  components: {
    'navigation-bar': NavigationBar
  }
}
</script>

<style>
.wrapper {
  width:100%;
  height:100%;
}
</style>
