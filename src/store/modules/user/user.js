import API from '../../../api.js'

const state = {
  user: null,
  card: null,
  history: [],
  history_meta: null,
  ride_status: null,
  companies: null,
  default_company: null
}

const getters = {
  user: state => state.user,
  card: state => state.card,
  history: state => state.history,
  history_meta: state => state.history_meta,
  ride_status: state => state.ride_status,
  companies: state => state.companies,
  default_company: state => state.default_company
}

const mutations = {
  GET_USER (state, payload) {
    state.user = payload
  },
  USER_RIDE_STATUS (state, payload) {
    state.ride_status = payload
  },
  CARD (state, payload) {
    state.card = payload
  },
  HISTORY_META (state, payload) {
    state.history_meta = payload
  },
  USER_HISTORY (state, payload) {
    state.history = payload
  },
  USER_HISTORY_ADD (state, payload) {
    state.history = state.history.concat(payload)
  },
  USER_COMPANIES (state, payload) {
    state.companies = payload
  },
  DEFAULT_COMPANY (state, payload) {
    state.default_company = payload
  }
}

const actions = {
  getUser ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/auth/check', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
          API.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
          API.defaults.headers.common['Accept-Language'] = response.data.data.lang
          commit('GET_USER', response.data.data)
          commit('USER_RIDE_STATUS', response.data.data.current_ride)
          commit('CARD', response.data.data.default_card)
          commit('USER_COMPANIES', response.data.data.company_client)
          commit('DEFAULT_COMPANY', response.data.data.default_company)
          resolve(response)
        })
        .catch(error => {
          localStorage.clear()
          window.location.reload()
          reject(error)
        })
    })
  },
  getHistory ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/clients/history')
        .then(response => {
          commit('HISTORY_META', response.data.meta)
          commit('USER_HISTORY', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  historyNextPage ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      API.get('api/clients/history?page=' + (1 + getters.history_meta.current_page))
        .then(response => {
          commit('HISTORY_META', response.data.meta)
          commit('USER_HISTORY_ADD', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  clearRideStatus ({ commit }) {
    commit('USER_RIDE_STATUS', null)
  },
  editName ({ commit, getters }, data) {
    return new Promise((resolve, reject) => {
      API.put('/api/clients', { first_name: data.first_name, last_name: data.last_name })
        .then(response => {
          commit('GET_USER', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  editEmail ({ commit, getters }, data) {
    return new Promise((resolve, reject) => {
      API.put('/api/clients', { email: data.email })
        .then(response => {
          commit('GET_USER', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  editLang ({ commit, getters }, data) {
    return new Promise((resolve, reject) => {
      API.put('/api/clients', { lang: data.lang })
        .then(response => {
          commit('GET_USER', response.data.data)
          API.defaults.headers.common['Accept-Language'] = response.data.data.lang
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  editCard ({ commit, getters }, data) {
    return new Promise((resolve, reject) => {
      API.put('/api/clients', { card_id: data.id, default_company_id: null })
        .then(response => {
          commit('GET_USER', response.data.data)
          commit('CARD', response.data.data.default_card)
          commit('DEFAULT_COMPANY', response.data.data.default_company)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  editCompany ({ commit, getters }, data) {
    return new Promise((resolve, reject) => {
      API.put('/api/clients', { default_company_id: data.id, card_id: null })
        .then(response => {
          commit('GET_USER', response.data.data)
          commit('CARD', response.data.data.default_card)
          commit('DEFAULT_COMPANY', response.data.data.default_company)
          resolve(response)
        })
        .catch(error => {
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
