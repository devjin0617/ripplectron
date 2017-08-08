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

.el-menu {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  border-radius: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

body, #app {
  height: 100vh;
  width: 100vw;
}

.flex-container {
  display:flex;
  
  &.middle {
    align-items: center;
  }

  &.center {
    justify-content: center;
  }
}

.icon-column .cell {
  padding-left:5px;
  padding-right:5px;
}

.el-submenu .el-menu {
  width: 203px;
}
</style>
