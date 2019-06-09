import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './config/firebase'
import Toasted from 'vue-toasted'
import VuetifyConfirm from 'vuetify-confirm'

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Accept',
  buttonFalseText: 'Discard',
  color: 'warning',
  icon: 'warning',
  title: 'Warning',
  width: 350,
  property: '$confirm'
})
Vue.use(Toasted)

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export const storageService = firebase.storage()
export const storageRef = storageService.ref()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
