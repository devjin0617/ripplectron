<template>
  <div>
    <div class="wrapper">
      <navigation-bar :active-index="'1'"></navigation-bar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar'

export default {
  name: 'wallet-main',
  data () {
    return {
      activeIndex: '1'
    }
  },
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
