import Vue from 'vue'
import Vuex from 'vuex'
import userManager from './modules/userManager/userManager'
import vacanciesManager from './modules/vacancies/vacanciesManager'
import filterManager from './modules/filterManager/filterManager'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    userManager,
    vacanciesManager,
    filterManager
  }
})
