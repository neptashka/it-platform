import {
  UPDATE_JOB_DATA,
  UPDATE_PERSONAL_DATA
} from './constants'

export default {
  [UPDATE_JOB_DATA](state, data) {
    state.jobData = data
  },
  [UPDATE_PERSONAL_DATA](state, data) {
    state.personalData = data
  }
}
