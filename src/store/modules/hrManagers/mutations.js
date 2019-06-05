import {
  UPDATE_HR_CONTACT,
  UPDATE_HR_PROGRESS
} from './constants'

export default {
  [UPDATE_HR_CONTACT](state, data) {
    state.hrContact = data
  },
  [UPDATE_HR_PROGRESS](state, data) {
    state.hrProgress = data
  }
}
