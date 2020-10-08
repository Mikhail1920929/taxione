const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000

const app = express()

let BASE_URL = process.env.VUE_APP_BACKEND_URL
  ? `https://${process.env.VUE_APP_BACKEND_URL}`
  : 'https://taxione-backend-staging.tax1one.ru'

app.use(history())
app.use(serveStatic('./dist/pwa', {
  setHeaders: function (res) {
    res.setHeader('X-BASE-URL', BASE_URL)
  }
}))
app.listen(port)
