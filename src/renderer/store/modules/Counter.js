import Store from 'electron-store'
const store = new Store()

const state = {
  main: 0,
  wallet: {
    address: '',
    secret: ''
  }
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  RESET (state) {
    state.wallet.address = ''
    state.wallet.secret = ''
    store.delete('address')
    store.delete('secret')
  },
  SET_WALLET (state, params) {
    state.wallet.address = params.address
    store.set('address', params.address)
    if (params.secret) {
      state.wallet.secret = params.secret
      store.set('secret', params.secret)
    }
  },
  FETCH_WALLET (state) {
    state.wallet.address = store.get('address')
    state.wallet.secret = store.get('secret')
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  reset ({ commit }) {
    commit('RESET')
  },
  setWallet ({ commit }, params) {
    commit('SET_WALLET', params)
  },
  fetchWallet ({ commit }) {
    commit('FETCH_WALLET')
  }
}

const getters = {
  getWallet: state => {
    return state.wallet
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
