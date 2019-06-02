import { UPDATE_VACANCIES } from './constants'

export default {
  [UPDATE_VACANCIES](state, vacancies) {
    state.vacancies = vacancies
  }
}
