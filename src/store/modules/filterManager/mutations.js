import {
  UPDATE_CITIES_FILTERS,
  UPDATE_LANGUAGES_FILTERS
} from './constants'

export default {
  [UPDATE_CITIES_FILTERS](state, filters) {
    state.citiesFilters = filters
  },
  [UPDATE_LANGUAGES_FILTERS](state, filters) {
    state.languagesFilters = filters
  }
}
