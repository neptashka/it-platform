import {
  UPDATE_VACANCIES,
  UPDATE_FILTERED_VACANCIES,
  INIT_FILTERED_VACANCIES,
  UPDATE_REQUESTS,
  UPDATE_FILTERED_REQUESTS,
  INIT_FILTERED_REQUESTS
} from './constants'
import {
  filteredVacanciesArrayByArray,
  filteredVacanciesByString,
  getIntersection,
  filteredVacanciesByArray
} from '../../../Tools/Filters'

export default {
  [UPDATE_VACANCIES](state, vacancies) {
    state.vacancies = vacancies
  },
  [UPDATE_FILTERED_VACANCIES](state, { filters, vacancies }) {

    if (
      filters.languages.length === 0 &&
      !filters.jobExperience &&
      filters.cities.length === 0 &&
      !filters.English
    ) {
      state.filteredVacancies = vacancies
      return
    }
    const filtersArray = []
    if (filters.languages.length > 0) {
      filtersArray.push(
        filteredVacanciesArrayByArray(vacancies, filters.languages, 'languages')
      )
    }
    if (filters.cities.length > 0) {
      filtersArray.push(
        filteredVacanciesByArray(vacancies, filters.cities, 'city')
      )
    }
    if (filters.jobExperience) {
      filtersArray.push(
        filteredVacanciesByString(
          vacancies,
          filters.jobExperience,
          'experience'
        )
      )
    }
    if (filters.English) {
      filtersArray.push(
        filteredVacanciesByString(vacancies, filters.English, 'English')
      )
    }
    state.filteredVacancies = getIntersection(filtersArray)
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
