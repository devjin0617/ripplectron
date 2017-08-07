<template>
  <div class="content">
    <div class="flex-container middle center fill">
      <div class="text-center">
        <el-form label-position="top" label-width="100px" :model="formData" :rules="rules">
          <el-form-item :label="$t('SEND_PAGE.DESTINATION_ADDRESS')" prop="address">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
          <el-form-item :label="$t('SEND_PAGE.IS_TAG_TEXT')" prop="isTag">
            <el-switch on-text="" off-text="" v-model="formData.isTag"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('SEND_PAGE.DESTINATION_TAG')" v-show="formData.isTag" prop="tag">
            <el-input v-model="formData.tag"></el-input>
          </el-form-item>
          <el-form-item>
            <el-form :inline="true" label-position="top" :model="formData" :rule="rules">
              <el-form-item class="input-xrp" label="XRP" prop="xrp">
                <el-input v-model="formData.xrp" @blur="onBlur('xrp')"></el-input>
              </el-form-item>
              <el-form-item class="input-money" :label="$t('SEND_PAGE.MONEY')" prop="money">
                <el-input v-model="formData.money" @blur="onBlur('money')"></el-input>
              </el-form-item>
            </el-form>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="payment">{{ $t('COMMON.SEND') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sha256 from 'sha256'
import aes256 from 'aes256'

export default {
  name: 'send-page',
  data () {
    const validatePass = (rule, value, callback) => {
      console.log('validatePass')
      if (value.match(new RegExp(/^r[rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz]{27,35}$/))) {
        callback()
      } else {
        callback(new Error(this.$i18n.t('SEND_PAGE.VALIDATION.EMPTY_INPUT')))
      }
    }
    return {
      formData: {
        address: '',
        isTag: true,
        tag: '',
        xrp: '',
        money: ''
      },
      rules: {
        address: [
          { required: true, message: this.$i18n.t('SEND_PAGE.VALIDATION.CHECK_ADDRESS'), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        xrp: [
          { required: true, message: this.$i18n.t('SEND_PAGE.VALIDATION.CHECK_XRP'), trigger: 'blur' }
        ],
        money: [
          { required: true, message: this.$i18n.t('SEND_PAGE.VALIDATION.CHECK_MONEY'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'getWallet'
    ]),
    regex () {
      return new RegExp(/^r[rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz]{27,35}$/)
    }
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
      this.$confirm(this.$i18n.t('COMMON.CONFIRM.SEND_COIN.DESCRIPTION'), this.$i18n.t('COMMON.CONFIRM.SEND_COIN.TITLE'), {
        confirmButtonText: this.$i18n.t('COMMON.OK'),
        cancelButtonText: this.$i18n.t('COMMON.CANCEL')
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

      if (!payment.destination.address.match(this.regex)) {
        this.$message({
          message: this.$i18n.t('SEND_PAGE.VALIDATION.EMPTY_INPUT'),
          type: 'error'
        })
        return
      }

      if (this.formData.isTag) {
        if (this.formData.tag) {
          payment.destination.tag = parseInt(this.formData.tag)
        } else {
          this.$message({
            message: 'Please input destination tag',
            type: 'error'
          })
          return
        }
      }

      const instructions = {
        maxLedgerVersionOffset: 5
      }

      this.$prompt(this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.DESCRIPTION'), this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.TITLE'), {
        confirmButtonText: this.$i18n.t('COMMON.OK'),
        cancelButtonText: this.$i18n.t('COMMON.CANCEL'),
        inputPattern: /^[\w]{6,32}$/,
        inputErrorMessage: this.$i18n.t('COMMON.CONFIRM.INPUT_CRYPTO_KEY.VALIDATION.TEXT')
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
                confirmButtonText: this.$i18n.t('COMMON.OK')
              })
            }).catch(() => {
              this.$message('send fail!', 'error', {
                confirmButtonText: this.$i18n.t('COMMON.OK')
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
  margin-top:60px;
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
