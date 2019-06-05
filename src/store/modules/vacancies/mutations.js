import {
  UPDATE_VACANCIES,
  UPDATE_FILTERED_VACANCIES,
  INIT_FILTERED_VACANCIES,
  UPDATE_REQUESTS,
  UPDATE_FILTERED_REQUESTS,
  INIT_FILTERED_REQUESTS
} from './constants'
import { isEmptyObject, allFalseValues } from '../../../Tools/ObjectMethods'

export default {
  [UPDATE_VACANCIES](state, vacancies) {
    state.vacancies = vacancies
  },
  [UPDATE_FILTERED_VACANCIES](state, { filters, vacancies }) {
    if ((isEmptyObject(filters.cities) && isEmptyObject(filters.languages))
      || (allFalseValues(filters.cities) && allFalseValues(filters.languages))){
      state.filteredVacancies = vacancies
    } else {
      state.filteredVacancies = vacancies.filter(
        vacancy =>
          filters.cities[vacancy.content.city]
          || vacancy.content.languages
            .some(lang => filters.languages[lang])
      )
    }
  },
  [INIT_FILTERED_VACANCIES](state, vacancies) {
    state.filteredVacancies = vacancies
  },
  [UPDATE_REQUESTS](state, vacancies) {
    state.requests = vacancies
  },
  [UPDATE_FILTERED_REQUESTS](state, { filters, vacancies }) {
    state.filteredRequests = vacancies
  },
  [INIT_FILTERED_REQUESTS](state, vacancies) {
    state.filteredRequests = vacancies
  }
}
