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
import { mapActions } from 'vuex'

export default {
  name: 'start-page',
  created () {
    this.Loading(false)
  },
  mounted () {
    this.Loading(false)
  },
  methods: {
    ...mapActions([
      'setAddress'
    ]),
    createWallet () {
      console.log(this.$router)
      this.$router.replace('wallet')
    },
    loadWallet () {
      this.$prompt('Please input your Ripple Secret key', 'get address', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(params => {
        this.setAddress({
          address: params.value
        })
        this.$router.replace('wallet')
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

<style lang="scss" scoped>
.wrapper {
  background-color:#324057;
  width:100%;
  height:100%;
  color: white;

  .title {
    font-size:20px;
    text-align:center;
    margin-bottom:20px;
  }
}
</style>
