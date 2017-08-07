<template>
  <div class="content">
    <div class="flex-container middle center fill">
      <div class="text-center">
        <h3>{{ $t('COMMON.BALANCE') }}</h3>
        <div class="space"></div>
        <h1>{{ balance }} <span v-if="balance != '-'" class="unit">XRP</span></h1>
        <div class="space"></div>
        <div>
          <el-button type="primary" @click="reload">{{ $t('WALLET_PAGE.RELOAD_BALANCE') }}</el-button>
        </div>
        <div class="space"></div>
        <div>
          <span>{{ $t('COMMON.PUBLIC_ADDRESS') }}: {{ getWallet.address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import sha256 from 'sha256'
// import aes256 from 'aes256'

export default {
  name: 'wallet-page',
  data () {
    return {
      balance: '-'
    }
  },
  created () {
    this.Loading(false)
    if (!this.getWallet.address) {
      this.$router.replace('home')
    }
  },
  mounted () {
    this.Loading(false)
    if (!this.getWallet.address) {
      this.$router.replace('home')
      return
    }
    this.reload()
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
    reload () {
      this.Loading(true)
      this.balance = '-'
      this.$ripple.connect().then(() => {
        this.$ripple.getBalances(this.getWallet.address).then(balances => {
          console.log(balances)
          this.balance = balances[0].value
          this.Loading(false)
        }).catch(err => {
          if (err.name === 'RippledError') {
            this.balance = 0
            this.Loading(false)
          } else {
            this.$message('not found account', 'error', {
              confirmButtonText: this.$i18n.t('COMMON.OK'),
              callback: () => {
                this.reset()
                this.$router.replace('home')
              }
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top:60px;
  padding-top:60px;
  height:100%;

  .fill {
    width:100%;
    height:100%;
    padding-bottom:50px;

    h1, h2, h3 {
      color: #324057;
    }

    h1 {
      font-size: 50px;
    }

    h3 {
      font-size: 30px;
    }
  }

  .space {
    margin-top:10px;
  }

  .unit {
    font-size:15px;
  }
}

.text-center {
  text-align:center;
}
</style>
