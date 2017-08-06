<template>
  <el-menu theme="dark" :default-active="navIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">{{ $t('COMMON.BALANCE') }}</el-menu-item>
    <el-menu-item index="2">{{ $t('COMMON.SEND') }}</el-menu-item>
    <el-menu-item index="3">{{ $t('COMMON.GET_SECRET') }}</el-menu-item>
    <el-menu-item index="4" class="danger-item">{{ $t('COMMON.REMOVE_WALLET') }}</el-menu-item>
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
        case '4':
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
