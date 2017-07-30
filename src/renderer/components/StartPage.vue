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
import sha256 from 'sha256'
import aes256 from 'aes256'

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
      'setWallet'
    ]),
    createWallet () {
      this.$confirm('Would you like to make a wallet?', 'Create Wallet', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(params => {
        this.$prompt('Please input your Crypto key (not Secret key)', 'Encryption', {
          confirmButtonText: 'OK',
          showCancelButton: false,
          inputPattern: /^[\w]{6,32}$/,
          inputErrorMessage: 'Number or String (Enter more than 6~32 characters)'
        }).then(params => {
          let cryptoValue = params.value
          const account = this.$ripple.generateAddress()
          const h = this.$createElement
          const text = h('div', null, [
            h('p', null, 'Wallet Created.'),
            h('p', null, [
              h('span', null, 'Public address: '),
              h('span', null, account.address)
            ]),
            h('p', null, [
              h('span', null, 'Wallet secret: '),
              h('span', {style: 'color:#FF4949'}, account.secret)
            ]),
            h('p', null, [
              h('span', null, 'Crypto key: '),
              h('span', {style: 'color:#FF4949'}, cryptoValue)
            ])
          ])
          let cryptoHash = sha256(cryptoValue)
          this.setWallet({
            address: account.address,
            secret: aes256.encrypt(cryptoHash, account.secret)
          })
          this.$alert(text, 'Success!', {
            confirmButtonText: 'OK',
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
      this.$prompt('Please input your Ripple Public Address', 'Get Wallet', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(params => {
        account.address = params.value
        this.$prompt('Please input your Ripple Secret', 'Get Wallet', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel'
        }).then(params => {
          account.secret = params.value
          this.$prompt('Please input your Crypto key (not Secret key)', 'Encryption', {
            confirmButtonText: 'OK',
            showCancelButton: false,
            inputPattern: /^[\w]{6,32}$/,
            inputErrorMessage: 'Number or String (Enter more than 6~32 characters)'
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
