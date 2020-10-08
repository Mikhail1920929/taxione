import axios from 'axios'

let baseURL = 'https://taxione-backend-staging.tax1one.ru'

fetch(`/`)
  .then(data => {
    if (data.headers.has('X-BASE-URL')) {
      API.defaults.baseURL = data.headers.get('X-BASE-URL')
      window.baseURL = data.headers.get('X-BASE-URL')
    }
  })

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: { 'X-Requested-With': 'XMLHttpRequest', 'X-CurrentTimezone': 'Europe/Moscow' }
})

export default API
