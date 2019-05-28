import Vue from 'vue'
import Vuex from 'vuex'
import userManager from './modules/userManager/userManager'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    userManager
  }
})
