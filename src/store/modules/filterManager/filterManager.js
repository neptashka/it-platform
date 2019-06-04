import mutations from './mutations'
import {
  UPDATE_CITIES_FILTERS,
  UPDATE_LANGUAGES_FILTERS
} from './constants'

const userManager = {
  state: {
    citiesFilters: {},
    languagesFilters: {}
  },
  getters: {
    citiesFilters(state) {
      return state.citiesFilters
    },
    languagesFilters(state) {
      return state.languagesFilters
    }
  },
  mutations,
  actions: {
    updateCitiesFilters(store, filters) {
      store.commit(UPDATE_CITIES_FILTERS, filters)
    },
    updateLanguagesFilters(store, filters) {
      store.commit(UPDATE_LANGUAGES_FILTERS, filters)
    }
  }
}

export default userManager
