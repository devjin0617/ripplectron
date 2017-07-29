<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'ripplectron'
  }
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body { font-family: 'Source Sans Pro', sans-serif; }

.flex-container {
  display:flex;
  
  &.middle {
    align-items: center;
  }

  &.center {
    justify-content: center;
  }
}
</style>
