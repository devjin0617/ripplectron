<template>
  <div class="wrapper flex-container middle center">
    <div>
      <div class="title">
        {{ $t('START_PAGE.TITLE') }}
      </div>
      <div>
        <el-button type="primary" @click="createWallet">{{ $t('START_PAGE.BUTTON.CREATE') }}</el-button>
        <el-button type="primary" @click="loadWallet">{{ $t('START_PAGE.BUTTON.OPEN') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sha256 from 'sha256'
import aes256 from 'aes256'

export default {
  name: 'start-page',
  created () {
    this.Loading(false)
  },
  mounted () {
    this.Loading(false)
    if (this.getWallet.address) {
      this.$router.replace({
        name: 'wallet-main'
      })
    }
  },
  computed: {
    ...mapGetters([
      'getWallet'
    ])
  },
  methods: {
    ...mapActions([
      'setWallet'
    ]),
    createWallet () {
      console.log(this.$i18n.t('COMMON.CONFIRM.CREATE_WALLET.DESCRIPTION'))
      this.$confirm(this.$i18n.t('COMMON.CONFIRM.CREATE_WALLET.DESCRIPTION'), this.$i18n.t('COMMON.CONFIRM.CREATE_WALLET.TITLE'), {
        confirmButtonText: this.$i18n.t('COMMON.OK'),
        cancelButtonText: this.$i18n.t('COMMON.CANCEL')
      }).then(params => {
        this.$prompt(this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.DESCRIPTION'), this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.TITLE'), {
          confirmButtonText: this.$i18n.t('COMMON.OK'),
          showCancelButton: false,
          inputPattern: /^[\w]{6,32}$/,
          inputErrorMessage: this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.VALIDATION.TEXT')
        }).then(params => {
          let cryptoValue = params.value
          const account = this.$ripple.generateAddress()
          const h = this.$createElement
          const text = h('div', null, [
            h('p', null, 'Wallet Created.'),
            h('p', null, [
              h('span', null, `${this.$i18n.t('COMMON.PUBLIC_ADDRESS')}: `),
              h('span', null, account.address)
            ]),
            h('p', null, [
              h('span', null, `${this.$i18n.t('COMMON.WALLET')} ${this.$i18n.t('COMMON.SECRET')}: `),
              h('span', {style: 'color:#FF4949'}, account.secret)
            ]),
            h('p', null, [
              h('span', null, `${this.$i18n.t('COMMON.SECRET')}: `),
              h('span', {style: 'color:#FF4949'}, cryptoValue)
            ])
          ])
          let cryptoHash = sha256(cryptoValue)
          this.setWallet({
            address: account.address,
            secret: aes256.encrypt(cryptoHash, account.secret)
          })
          this.$alert(text, 'Success!', {
            confirmButtonText: this.$i18n.t('COMMON.OK'),
            callback: action => {
              this.$router.replace('wallet')
            }
          })
        })
      }).catch(() => {

      })
    },
    loadWallet () {
      let account = {
        address: '',
        secret: ''
      }
      this.$prompt(this.$i18n.t('COMMON.CONFIRM.INPUT_PUBLIC_ADDRESS.DESCRIPTION'), this.$i18n.t('COMMON.CONFIRM.INPUT_PUBLIC_ADDRESS.TITLE'), {
        confirmButtonText: this.$i18n.t('COMMON.OK'),
        cancelButtonText: this.$i18n.t('COMMON.CANCEL')
      }).then(params => {
        account.address = params.value
        this.$prompt(this.$i18n.t('COMMON.CONFIRM.INPUT_SECRET.DESCRIPTION'), this.$i18n.t('COMMON.CONFIRM.INPUT_SECRET.TITLE'), {
          confirmButtonText: this.$i18n.t('COMMON.OK'),
          cancelButtonText: this.$i18n.t('COMMON.CANCEL')
        }).then(params => {
          account.secret = params.value
          this.$prompt(this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.DESCRIPTION'), this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.TITLE'), {
            confirmButtonText: this.$i18n.t('COMMON.OK'),
            showCancelButton: false,
            inputPattern: /^[\w]{6,32}$/,
            inputErrorMessage: this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.VALIDATION.TEXT')
          }).then(params => {
            let cryptoHash = sha256(params.value)
            this.setWallet({
              address: account.address,
              secret: aes256.encrypt(cryptoHash, account.secret)
            })
            this.$router.replace('wallet')
          })
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
