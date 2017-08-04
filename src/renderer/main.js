import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import messages from './lang'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import { RippleAPI } from 'ripple-lib'

const api = new RippleAPI({ server: 'wss://s1.ripple.com:443' })

Vue.prototype.$ripple = api

let loadingData = null
Vue.prototype.Loading = (isLoading) => {
  if (isLoading) {
    loadingData = ElementUI.Loading.service({
      fullscreen: true
    })
  } else {
    if (loadingData) {
      loadingData.close()
    }
  }
}
Vue.use(VueI18n)
Vue.use(ElementUI)
const i18n = new VueI18n({
  locale: 'ko',
  messages
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

store.dispatch('fetchWallet')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
