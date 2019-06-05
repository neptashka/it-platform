import Vue from 'vue'
import Vuex from 'vuex'
import userManager from './modules/userManager/userManager'
import vacanciesManager from './modules/vacancies/vacanciesManager'
import itProfileManager from './modules/it-profile/itProfileManager'
import filterManager from './modules/filterManager/filterManager'
import hrManager from './modules/hrManagers/hrManager'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    userManager,
    vacanciesManager,
    filterManager,
    itProfileManager,
    hrManager
  }
})
