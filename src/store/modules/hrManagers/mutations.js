import {
  UPDATE_HR_CONTACT,
  UPDATE_HR_PROGRESS,
  UPDATE_IT_COMPANIES,
	UDPATE_SELECTED_IT_COMPANY,
  UPDATE_SENT_VACANCY
} from './constants'

export default {
  [UPDATE_HR_CONTACT](state, data) {
    state.hrContact = data
  },
  [UPDATE_HR_PROGRESS](state, data) {
    state.hrProgress = data
  },
  [UPDATE_IT_COMPANIES](state, data) {
    state.itCompanies = data
  },
  [UDPATE_SELECTED_IT_COMPANY](state, data) {
    state.selectedItCompany = data
  },
  [UPDATE_SENT_VACANCY](state, data) {
    state.sentVacancy = data
  }
}
