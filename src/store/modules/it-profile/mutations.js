import {
  UPDATE_JOB_DATA,
  UPDATE_PERSONAL_DATA,
  UPDATE_PROFILE,
  UPDATE_SENT_REQUEST
} from './constants'

export default {
  [UPDATE_JOB_DATA](state, data) {
    state.jobData = data
  },
  [UPDATE_PERSONAL_DATA](state, data) {
    state.personalData = data
  },
  [UPDATE_PROFILE](state, data) {
    state.profile = data
  },
  [UPDATE_SENT_REQUEST](state, data) {
    state.requestSent = data
  }
}
