<template>
  <div class="wrapper flex-container middle center">
    <div>
      <div class="title">
        Repplectron (Ripple Wallet)
      </div>
      <div>
        <el-button type="primary" @click="createWallet">Create Wallet</el-button>
        <el-button type="primary" @click="loadWallet">Get the Wallet</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'start-page',
    methods: {
      createWallet () {
        this.$message('create!')
      },
      loadWallet () {
        this.$prompt('Please input your Ripple Secret key', 'get address', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel'
        }).then(params => {
          // this.$message({
          //   type: 'success',
          //   message: 'Your email is:' + value
          // })

          this.$ripple.connect().then(() => {
            this.$ripple.getBalances(params.value).then(balances => {
              console.log(balances)
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          })
        })
      }
    }
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
