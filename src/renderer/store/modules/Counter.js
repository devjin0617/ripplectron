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
  SET_ADDRESS (state, params) {
    state.wallet.address = params.address
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
  setAddress ({ commit }, params) {
    commit('SET_ADDRESS', params)
  }
}

const getters = {
  getAddress: state => {
    return state.wallet.address
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
