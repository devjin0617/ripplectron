<template>
  <div class="content">
    <div class="flex-container middle center fill">
      History
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'history-page',
  computed: {
    ...mapGetters([
      'getWallet'
    ])
  },
  mounted () {
    let url = `https://data.ripple.com/v2/accounts/${this.getWallet.address}/transactions`
    let params = {
      limit: 15,
      descending: true
    }
    this.$http.get(url, params).then(res => {
      if (res.data.result === 'success') {
        console.log(res.data.transactions)
      }
    }).catch(err => {
      console.log(err)
    })
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
  }
}
</style>
