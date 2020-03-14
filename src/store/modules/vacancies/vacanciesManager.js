import mutations from './mutations'
import {
  UPDATE_VACANCIES,
  UPDATE_FILTERED_VACANCIES,
  INIT_FILTERED_VACANCIES,
  INIT_FILTERED_REQUESTS,
  UPDATE_REQUESTS,
  UPDATE_FILTERED_REQUESTS
} from './constants'

const userManager = {
  state: {
    vacancies: [],
    filteredVacancies: [],
    requests: [],
    filteredRequests: []
  },
  getters: {
    vacancies(state) {
      return state.vacancies
    },
    filteredVacancies(state) {
      return state.filteredVacancies
    },
    requests(state) {
      return state.requests
    },
    filteredRequests(state) {
      return state.filteredRequests
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
    },
    updateRequests(store, requests) {
      store.commit(UPDATE_REQUESTS, requests)
    },
    initFilteredRequests(store, requests) {
      store.commit(INIT_FILTERED_REQUESTS, requests)
    },
    updateFilteredRequests(store, { filters, vacancies }) {
      store.commit(UPDATE_FILTERED_REQUESTS, { filters, vacancies })
    }
  }
}

export default userManager
