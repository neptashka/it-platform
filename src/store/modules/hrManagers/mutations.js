import {
  UPDATE_HR_CONTACT,
  UPDATE_HR_PROGRESS,
  UPDATE_IT_COMPANIES,
  UDPATE_SELECTED_IT_COMPANY,
  UPDATE_SENT_VACANCY,
  UPDATE_IT_COMPANY,
  UPDATE_HR_PERSONAL_INFO,
  UPDATE_HR_VACANCIES,
  UPDATE_HR_VACANCIES_IDS
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
  },
  [UPDATE_IT_COMPANY](state, data) {
    state.itCompany = data
  },
  [UPDATE_HR_PERSONAL_INFO](state, data) {
    state.hrPersonalInfo = data
  },
  [UPDATE_HR_VACANCIES](state, data) {
    state.hrVacancies = data
  },
  [UPDATE_HR_VACANCIES_IDS](state, data) {
    state.hrVacanciesIds = data
  }
}
