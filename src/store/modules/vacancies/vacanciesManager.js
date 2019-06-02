import mutations from './mutations'
import {
  UPDATE_VACANCIES
} from './constants'

const userManager = {
  state: {
    vacancies: null
  },
  getters: {
    vacancies(state) {
      return state.vacancies
    }
  },
  mutations,
  actions: {
    updateVacancies(store, vacancy) {
      store.commit(UPDATE_VACANCIES, vacancy)
    }
  }
}

export default userManager
