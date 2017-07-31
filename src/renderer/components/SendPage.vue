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
                    <el-input v-model="formData.xrp"></el-input>
                  </el-form-item>
                  <el-form-item class="input-money" label="Money">
                    <el-input v-model="formData.money"></el-input>
                  </el-form-item>
                </el-form>
              </el-form-item>
            </el-form>
            <el-button type="primary">Send</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NaviBar from './NaviBar'
import { mapGetters } from 'vuex'

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
