import mutations from './mutations'
import {
  UPDATE_VACANCIES,
  UPDATE_FILTERED_VACANCIES,
  INIT_FILTERED_VACANCIES
} from './constants'

const userManager = {
  state: {
    vacancies: [],
    filteredVacancies: []
  },
  getters: {
    vacancies(state) {
      return state.vacancies
    },
    filteredVacancies(state) {
      return state.filteredVacancies
    }
  },
  mutations,
  actions: {
    updateVacancies(store, vacancy) {
      store.commit(UPDATE_VACANCIES, vacancy)
    },
    initFilteredVacancies(store, vacancies) {
      store.commit(INIT_FILTERED_VACANCIES, vacancies)
    },
    updateFilteredVacancies(store, { filters, vacancies }) {
      store.commit(UPDATE_FILTERED_VACANCIES, { filters, vacancies })
    }
  }
}

export default userManager
