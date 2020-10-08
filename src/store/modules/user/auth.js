import API from '../../../api.js'

const state = {
  token: localStorage.getItem('token') || '',
  countries: null
}

const getters = {
  token: state => state.token,
  isAuth: state => !!state.token,
  countries: state => state.countries
}

const mutations = {
  AUTH_SUCCESS (state, payload) {
    state.token = payload
  },
  AUTH_LOGOUT () {
    localStorage.clear()
    window.location.reload()
  },
  COUNTRIES (state, payload) {
    state.countries = payload
  }
}

const actions = {
  sendCode ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('/sanctum/csrf-cookie')
        .then(response => {
          API.post('api/auth', { phone: data.phone, country_code: data.country_code }, { headers: { 'X-CurrentCountry': data.country_code, 'Accept-Language': data.lang } })
            .then(response => {
              localStorage.setItem('userPhone', data.phone)
              localStorage.setItem('userCountry', data.country_code)
              API.defaults.headers.common['X-CurrentCountry'] = data.country_code
              API.defaults.headers.common['Accept-Language'] = data.lang
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
    })
  },
  confirm ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/auth/login', { phone: data.phone, code: data.code })
        .then(response => {
          localStorage.clear()
          const token = response.data.access_token
          localStorage.setItem('token', token)
          commit('AUTH_SUCCESS', token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/auth/logout', { headers: { 'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          commit('AUTH_LOGOUT')
          resolve(response)
        })
        .catch(error => {
          commit('AUTH_LOGOUT')
          reject(error)
        })
    })
  },
  deleteUser ({ commit }) {
    return new Promise((resolve, reject) => {
      API.delete('api/clients', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
          commit('AUTH_LOGOUT')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getCountries ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/countries')
        .then(response => {
          commit('COUNTRIES', response.data.data)
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
