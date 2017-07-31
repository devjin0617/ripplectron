<template>
  <el-menu theme="dark" :default-active="navIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Balance</el-menu-item>
    <el-menu-item index="2">Send</el-menu-item>
    <el-menu-item index="3">Get Secret</el-menu-item>
    <el-menu-item index="4" class="danger-item">Remove Wallet</el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sha256 from 'sha256'
import aes256 from 'aes256'

export default {
  name: 'navi-bar',
  props: ['active-index'],
  data () {
    return {
      navIndex: ''
    }
  },
  mounted () {
    this.navIndex = this.activeIndex
  },
  computed: {
    ...mapGetters([
      'getWallet'
    ])
  },
  methods: {
    ...mapActions([
      'reset'
    ]),
    handleSelect (index) {
      switch (index) {
        case '1':
          // balance
          this.$router.replace('wallet')
          break
        case '2':
          // send
          this.$router.replace('send')
          break
        case '3':
          // Get Secret
          this.$prompt('Please input your Crypto key', 'Get Secret', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputPattern: /^[\w]{6,32}$/,
            inputErrorMessage: 'Number or String (Enter more than 6~32 characters)'
          }).then(params => {
            let cryptoHash = sha256(params.value)
            let secret = aes256.decrypt(cryptoHash, this.getWallet.secret)
            this.$alert(secret, 'Secret', {
              confirmButtonText: 'OK'
            })
          }).catch(() => {

          })
          break
        case '4':
          // remove
          this.removeWallet()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.danger-item {
  float:right;
  color:#FF4949;

  &:hover {
    border-bottom: 5px solid #FF4949;
  }
}
</style>
