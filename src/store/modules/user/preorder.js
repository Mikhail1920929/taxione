import API from '../../../api.js'

const state = {
  preorders: null,
  preorders_meta: null
}

const getters = {
  preorders: state => state.preorders,
  preorders_meta: state => state.preorders_meta
}

const mutations = {
  USER_PREORDERS (state, payload) {
    if (payload.length === 0) {
      state.preorders = null
    } else {
      state.preorders = payload
    }
  },
  PREORDERS_META (state, payload) {
    state.preorders_meta = payload
  },
  ADD_PREORDERS (state, payload) {
    state.preorders = state.preorders.concat(payload)
  }
}

const actions = {
  loadPreorders ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/clients/templates')
        .then(response => {
          commit('PREORDERS_META', response.data)
          commit('USER_PREORDERS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  preorderNextPage ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      API.get('api/clients/templates?page=' + (1 + getters.preorders_meta.current_page))
        .then(response => {
          commit('PREORDERS_META', response.data)
          commit('ADD_PREORDERS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  addPreorder ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/rides',
        {
          start_at: data.start_at + ':00',
          class: data.carClass,
          uuid: data.uuid,
          estimate_cost: data.price,
          position: {
            'city': data.from.city,
            'country': data.from.country,
            'latitude': data.from.lat,
            'longitude': data.from.lng,
            'name': data.from.name,
            'text': data.from.text,
            'postal_code': data.from.postal_code,
            'street_name': data.from.street_name,
            'street_number': data.from.street_number
          },
          destination: {
            'city': data.to.city,
            'country': data.to.country,
            'latitude': data.to.lat,
            'longitude': data.to.lng,
            'name': data.to.name,
            'text': data.to.text,
            'postal_code': data.to.postal_code,
            'street_name': data.to.street_name,
            'street_number': data.to.street_number
          },
          billing: data.billing
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  selectPreorder ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/rides/activate/' + data.id)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deletePreorder ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.delete('api/rides/' + data.id)
        .then(response => {
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
