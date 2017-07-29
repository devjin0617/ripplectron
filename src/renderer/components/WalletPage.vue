<template>
  <div class="wrapper">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Balance</el-menu-item>
      <el-menu-item index="2">Send</el-menu-item>
      <el-menu-item index="3" class="danger-item">Remove Wallet</el-menu-item>
    </el-menu>
    <div class="content">
      <div class="flex-container middle center fill">
        <div class="text-center">
          <h3>Balance</h3>
          <div class="space"></div>
          <h1>{{ balance }} <span v-if="balance != '-'" class="unit">XRP</span></h1>
          <div class="space"></div>
          <div>
            <el-button type="primary" @click="reload">Reload Balance</el-button>
          </div>
          <div class="space"></div>
          <div>
            <span>Public Address: {{ getAddress }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'wallet-page',
  data () {
    return {
      activeIndex: '1',
      balance: '-'
    }
  },
  created () {
    this.Loading(false)
    if (!this.getAddress) {
      this.$router.replace('home')
    }
  },
  mounted () {
    this.Loading(false)
    if (!this.getAddress) {
      this.$router.replace('home')
      return
    }
    this.reload()
  },
  computed: {
    ...mapGetters([
      'getAddress'
    ])
  },
  methods: {
    handleSelect (index) {
      switch (index) {
        case '1':
          // balance
          break
        case '2':
          // send
          break
        case '3':
          // remove
          this.removeWallet()
          break
      }
    },
    reload () {
      this.Loading(true)
      this.balance = '-'
      this.$ripple.connect().then(() => {
        this.$ripple.getBalances(this.getAddress).then(balances => {
          this.balance = balances[0].value
          this.Loading(false)
        })
      })
    },
    removeWallet () {
      const h = this.$createElement
      this.$msgbox({
        title: 'Warning',
        message: h(
          'div', null, [
            h('p', null, 'Are you sure you want to delete your wallet?'),
            h('p', null, '(You can recover it even after deleting it.)')
          ]
        ),
        showCancelButton: true,
        confirmButtonText: 'Remove',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: 'Cancel'
      })
      .then(() => {
        this.$message({
          message: 'removed!',
          type: 'error'
        })
        this.$router.replace('home')
      })
      .catch(() => {

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
