import API from '../../../api.js'
import axios from 'axios'

// stop setInteval in action 'sendsRideProps()'
let statusSearchingID = null
let statusContinueSearchingID = null
const CancelToken = axios.CancelToken
let source = CancelToken.source()

const state = {
  price: null,
  driver: null,
  status: null,
  payStatus: true,
  failCard: null,
  failCompany: null
}

const mutations = {
  SET_PRICE (state, payload) {
    state.price = payload
  },
  SET_DRIVER (state, payload) {
    state.payStatus = true
    state.failCard = null
    state.driver = payload
  },
  SET_STATUS (state, payload) {
    state.status = payload
  },
  CLEAR_STATUS (state) {
    state.driver = null
    state.status = null
  },
  FAIL_PAY (state, payload) {
    state.payStatus = false
    if (payload.useCard) {
      state.failCard = payload.useCard.card_id
    }
    if (payload.default_company) {
      state.failCompany = payload.default_company.id
    }
  },
  CLEAR_FAIL_CARD (state) {
    state.payStatus = true
    state.failCard = null
    state.failCompany = null
  }
}

const actions = {
  sendCoords ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/rides/estimate',
        {
          position: {
            'city': data.from.city,
            'country': data.from.country,
            'latitude': data.from.lat,
            'longitude': data.from.lng,
            'name': data.from.name,
            'text': data.to.text,
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
        }, { headers: { 'X-CurrentCountry': 'RUS' } })
        .then(response => {
          commit('SET_PRICE', response.data.estimates)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  sendsRideProps ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/rides',
        {
          template_id: data.template_id || null,
          billing: data.billing,
          uuid: data.uuid,
          class: data.selectCar.ride_class_name,
          start_at: data.start_at,
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
          }
        }, { headers: { 'X-CurrentCountry': 'RUS' } })
        .then(async response => {
          commit('SET_DRIVER', response.data.ride)

          // setInterval
          statusSearchingID = setInterval(async () => {
            let status = await API.get('api/rides/status', { params: { provider: state.driver.provider, uuid: state.driver.uuid }, cancelToken: source.token })
            commit('SET_STATUS', status.data)
            if (state.status.ride.ride_status_name === 'expired' || state.status.ride.ride_status_name === 'canceled' || state.status.ride.ride_status_name === 'failed' || state.status.ride.ride_status_name === 'complete') {
              source.cancel()
              source = CancelToken.source()
              clearInterval(statusContinueSearchingID)
              statusContinueSearchingID = null
              clearInterval(statusSearchingID)
              statusSearchingID = null
            }
          }, 1300)

          resolve(response)
        })
        .catch(error => {
          if (error.response.status === 469) {
            commit('FAIL_PAY', { useCard: data.useCard, default_company: data.default_company })
          }
          reject(error)
        })
    })
  },
  deleteRide ({ commit, state }) {
    return new Promise((resolve, reject) => {
      API.delete('api/rides/cancel', { params: { provider: state.driver.provider, uuid: state.driver.uuid } })
        .then(response => {
          source.cancel()
          source = CancelToken.source()
          clearInterval(statusContinueSearchingID)
          clearInterval(statusSearchingID)
          commit('CLEAR_STATUS')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  noDriver ({ commit }) {
    source.cancel()
    source = CancelToken.source()
    clearInterval(statusContinueSearchingID)
    clearInterval(statusSearchingID)
    commit('CLEAR_STATUS')
  },
  getRate ({ commit }, data) {
    clearInterval(statusContinueSearchingID)
    clearInterval(statusSearchingID)
    return new Promise((resolve, reject) => {
      API.put('/api/rides/' + state.status.ride.id, { rating: data.rating })
        .then(response => {
          source.cancel()
          source = CancelToken.source()
          clearInterval(statusContinueSearchingID)
          clearInterval(statusSearchingID)
          commit('CLEAR_STATUS')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  continueRide ({ commit }, data) {
    commit('SET_DRIVER', data)
    if (!statusContinueSearchingID) {
      statusContinueSearchingID = setInterval(async () => {
        let status = await API.get('api/rides/status', { params: { provider: data.provider, uuid: data.uuid }, cancelToken: source.token })
        commit('SET_STATUS', status.data)
        if (state.status.ride.ride_status_name === 'expired' || state.status.ride.ride_status_name === 'canceled' || state.status.ride.ride_status_name === 'failed' || state.status.ride.ride_status_name === 'complete') {
          source.cancel()
          source = CancelToken.source()
          clearInterval(statusContinueSearchingID)
          clearInterval(statusSearchingID)
          statusContinueSearchingID = null
          statusSearchingID = null
        }
      }, 1300)
    }
  },
  clearFailCard ({ commit }) {
    commit('CLEAR_FAIL_CARD')
  }
}

const getters = {
  price: state => state.price,
  driver: state => state.driver,
  status: state => state.status,
  payStatus: state => state.payStatus,
  failCard: state => state.failCard,
  failCompany: state => state.failCompany
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
