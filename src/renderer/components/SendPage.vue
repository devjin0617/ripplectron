<template>
  <div class="wrapper">
    <navi-bar :active-index="'2'"></navi-bar>
      <div class="content">
        <div class="flex-container middle center fill">
          <div class="text-center">
            <el-form label-position="top" label-width="100px" :model="formData">
              <el-form-item label="Receive XRP Address">
                <el-input v-model="formData.address"></el-input>
              </el-form-item>
              <el-form-item label="using destination tag" prop="delivery">
                <el-switch on-text="" off-text="" v-model="formData.isTag"></el-switch>
              </el-form-item>
              <el-form-item label="destination tag" v-show="formData.isTag">
                <el-input v-model="formData.tag"></el-input>
              </el-form-item>
              <el-form-item>
                <el-form :inline="true" label-position="top">
                  <el-form-item class="input-xrp" label="XRP">
                    <el-input v-model="formData.xrp" @blur="onBlur('xrp')"></el-input>
                  </el-form-item>
                  <el-form-item class="input-money" label="Money">
                    <el-input v-model="formData.money" @blur="onBlur('money')"></el-input>
                  </el-form-item>
                </el-form>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="payment">Send</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NaviBar from './NaviBar'
import { mapGetters } from 'vuex'
import sha256 from 'sha256'
import aes256 from 'aes256'

export default {
  name: 'send-page',
  data () {
    return {
      formData: {
        address: '',
        isTag: true,
        tag: '',
        xrp: '',
        money: ''
      }
    }
  },
  components: {
    'navi-bar': NaviBar
  },
  computed: {
    ...mapGetters([
      'getWallet'
    ])
  },
  methods: {
    onBlur (key) {
      console.log('onBlur:', key)
      if (key === 'xrp') {
        this.formData.money = this.formData.xrp * 198
      } else {
        this.formData.xrp = this.formData.money / 198
      }
    },
    sendXRP () {
      this.$confirm('Ready to XRP send?', 'Send', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(params => {
        this.payment()
      })
    },
    payment () {
      let payment = {
        source: {
          address: this.getWallet.address,
          maxAmount: {
            value: this.formData.xrp,
            currency: 'XRP'
          }
        },
        destination: {
          address: this.formData.address,
          tag: undefined,
          amount: {
            value: this.formData.xrp,
            currency: 'XRP'
          }
        }
      }

      if (this.formData.isTag && this.formData.tag) {
        payment.destination.tag = parseInt(this.formData.tag)
      }

      const instructions = {
        maxLedgerVersionOffset: 5
      }

      this.$prompt('Please input your Crypto key', 'Get Secret', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[\w]{6,32}$/,
        inputErrorMessage: 'Number or String (Enter more than 6~32 characters)'
      }).then(params => {
        let cryptoHash = sha256(params.value)
        let secret = aes256.decrypt(cryptoHash, this.getWallet.secret)
        this.$ripple.connect().then(() => {
          this.$ripple.preparePayment(this.getWallet.address, payment, instructions).then(prepared => {
            console.log('prepared', prepared)
            const { signedTransaction } = this.$ripple.sign(prepared.txJSON, secret)
            console.log('signedTransaction', signedTransaction)
            this.$ripple.submit(signedTransaction).then((test) => {
              console.log('test', test)
              this.$message('success!', 'success', {
                confirmButtonText: 'OK'
              })
            }).catch(() => {
              this.$message('send fail!', 'error', {
                confirmButtonText: 'OK'
              })
            })
          })
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width:100%;
  height:100%;
}
.danger-item {
  float:right;
  color:#FF4949;

  &:hover {
    border-bottom: 5px solid #FF4949;
  }
}
.content {
  margin-top:-60px;
  padding-top:60px;
  height:100%;

  .fill {
    width:100%;
    height:100%;

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

.el-form {
  width:400px;
  text-align: left;
}

.input-xrp {
  width: 40%;
  margin-right: 0;
}

.input-money {
  width: 59%;
  margin-right: 0;
}
</style>
