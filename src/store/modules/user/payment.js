import API from '../../../api.js'

const state = {
  cards: null
}

const getters = {
  cards: state => state.cards
}

const mutations = {
  GET_CARDS (state, payload) {
    if (payload.length === 0) {
      state.cards = null
    } else {
      state.cards = payload
    }
  }
}

const actions = {
  getCards ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/clients/cards')
        .then(response => {
          commit('GET_CARDS', response.data.cards)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  addCard ({ commit }) {
    return new Promise((resolve, reject) => {
      API.post('api/clients/cards', { success_url: '/pay/success', fail_url: '/pay/fail' })
        .then(response => {
          window.location = response.data.payment_url
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  checkCard ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/clients/cards/' + data.id + '/check')
        .then(response => {
          console.log(123)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  deleteCard ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.delete('api/clients/cards/' + data.id)
        .then(response => {
          commit('GET_CARDS', [])
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
