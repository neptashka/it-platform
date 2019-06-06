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
    const languages = filters.languages
    const cities = filters.cities
    const exp = filters.jobExperience
    let filteredCities = []
    let filteredLanguages = []
    if (isEmptyObject(cities) || allFalseValues(cities)) {
      filteredCities = vacancies
    } else {
      filteredCities = vacancies.filter(vacancy => cities[vacancy.content.city])
    }
    if (filteredCities.length === 0) {
      state.filteredVacancies = []
      return
    } else {
      if (isEmptyObject(languages) || allFalseValues(languages)) {
        filteredLanguages = filteredCities
      } else {
        filteredLanguages = vacancies.filter(vacancy => {
          let results = []
          console.log(vacancy.content.languages)
          const array = vacancy.content.languages
          Array.prototype.forEach.call(array, lang => {
            if (languages[lang]) {
              results.push(lang)
            }
          })
          console.log(results.length > 0)
          return results.length > 0
        })
        if (filteredLanguages.length === 0) {
          state.filteredVacancies = []
          return
        }
      }
      if (exp) {
        state.filteredVacancies = filteredLanguages.filter(
          vacancy => vacancy.content.experience === exp
        )
      } else state.filteredVacancies = filteredLanguages
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
