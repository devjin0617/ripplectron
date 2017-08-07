import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-page',
      component: require('@/components/StartPage')
    },
    {
      path: '/wallet',
      name: 'wallet-main',
      component: require('@/components/WalletMain'),
      children: [
        {
          path: '',
          name: 'wallet-page',
          component: require('@/components/WalletPage')
        },
        {
          path: 'send',
          name: 'send-page',
          component: require('@/components/SendPage')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
