<template>
  <div class="wrapper flex-container middle center">
    <div>
      <div class="title">
        Repplectron (Ripple Wallet)
      </div>
      <div>
        <el-button type="primary">Create Wallet</el-button>
        <el-button type="primary">Get the Wallet</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'start-page'
  }
</script>

<style lang="scss">
.wrapper {
  background-color:#324057;
  height: 100vh;
  width: 100vw;
  color: white;

  .title {
    font-size:20px;
    text-align:center;
    margin-bottom:20px;
  }
}
</style>
