<template>
  <el-menu theme="dark" :default-active="navIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="BALANCE">{{ $t('COMMON.BALANCE') }}</el-menu-item>
    <el-menu-item index="SEND">{{ $t('COMMON.SEND') }}</el-menu-item>
    <el-menu-item index="SECRET">{{ $t('COMMON.GET_SECRET') }}</el-menu-item>
    <el-menu-item index="HISTORY">{{ $t('COMMON.HISTORY') }}</el-menu-item>
    <el-submenu index="INFO">
      <template slot="title">Info</template>
      <el-menu-item index="APP_INFO">App Info</el-menu-item>
      <el-menu-item index="DONATE">Donate</el-menu-item>
      <el-menu-item index="SOURCE_CODE">Source Code</el-menu-item>
    </el-submenu>
    <el-menu-item index="REMOVE" class="danger-item">{{ $t('COMMON.REMOVE_WALLET') }}</el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sha256 from 'sha256'
import aes256 from 'aes256'

export default {
  name: 'navigation-bar',
  data () {
    return {
      navIndex: 'BALANCE'
    }
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
        case 'BALANCE':
          // balance
          this.$router.replace({
            name: 'wallet-main'
          })
          break
        case 'SEND':
          // send
          this.$router.replace({
            name: 'send-page'
          })
          break
        case 'SECRET':
          // Get Secret
          this.$prompt(this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.DESCRIPTION'), this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.TITLE'), {
            confirmButtonText: this.$i18n.t('COMMON.OK'),
            cancelButtonText: this.$i18n.t('COMMON.CANCEL'),
            inputPattern: /^[\w]{6,32}$/,
            inputErrorMessage: this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.VALIDATION.TEXT')
          }).then(params => {
            let cryptoHash = sha256(params.value)
            let secret = aes256.decrypt(cryptoHash, this.getWallet.secret)
            this.$alert(secret, this.$i18n.t('COMMON.SECRET'), {
              confirmButtonText: this.$i18n.t('COMMON.OK')
            })
          }).catch(() => {

          })
          break
        case 'HISTORY':
          this.$router.replace({
            name: 'history-page'
          })
          break
        case 'REMOVE':
          // remove
          this.removeWallet()
          break
      }
    },
    removeWallet () {
      const h = this.$createElement
      this.$msgbox({
        title: this.$i18n.t('COMMON.CONFIRM.REMOVE_WALLET.TITLE'),
        message: h(
          'div', null, [
            h('p', null, this.$i18n.t('COMMON.CONFIRM.REMOVE_WALLET.DESCRIPTION[0]')),
            h('p', null, this.$i18n.t('COMMON.CONFIRM.REMOVE_WALLET.DESCRIPTION[1]'))
          ]
        ),
        showCancelButton: true,
        confirmButtonText: this.$i18n.t('COMMON.REMOVE'),
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: this.$i18n.t('COMMON.CANCEL')
      })
      .then(() => {
        this.$message({
          message: this.$i18n.t('COMMON.MESSAGE.REMOVED'),
          type: 'error'
        })
        this.reset()
        this.$router.replace('home')
      })
      .catch(() => {

      })
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
