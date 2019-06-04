import {
  UPDATE_VACANCIES,
  UPDATE_FILTERED_VACANCIES,
  INIT_FILTERED_VACANCIES
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
  }
}
