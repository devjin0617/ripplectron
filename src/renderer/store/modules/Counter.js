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
  },
  SET_WALLET (state, params) {
    state.wallet.address = params.address
    if (params.secret) {
      state.wallet.secret = params.secret
    }
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
