import AuthModule from './auth'
import PaymentModule from './payment'
import UserModule from './user'
import PreorderModule from './preorder'

export default {
  namespaced: true,
  modules: {
    auth: {
      ...AuthModule
    },
    user: {
      ...UserModule
    },
    payment: {
      ...PaymentModule
    },
    preorder: {
      ...PreorderModule
    }
  }
}
