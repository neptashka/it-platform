import mutations from './mutations'
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

const hrManager = {
  state: {
    hrContact: null,
    hrProgress: 0,
    itCompanies: [],
    selectedItCompany: null,
    sentVacancy: null,
    itCompany: null,
    hrPersonalInfo: null,
    hrVacancies: [],
    hrVacanciesIds: []
  },
  getters: {
    hrContact(state) {
      return state.hrContact
    },
    hrProgress(state) {
      return state.hrProgress
    },
    itCompanies(state) {
      return state.itCompanies
    },
    selectedItCompany(state) {
      return state.selectedItCompany
    },
    sentVacancy(state) {
      return state.sentVacancy
    },
    itCompany(state) {
      return state.itCompany
    },
    hrPersonalInfo(state) {
      return state.hrPersonalInfo
    },
    hrVacancies(state) {
      return state.hrVacancies
    },
    hrVacanciesIds(state) {
      return state.hrVacanciesIds
    }
  },
  mutations,
  actions: {
    updateHrContact(store, data) {
      store.commit(UPDATE_HR_CONTACT, data)
    },
    updateHrProgress(store, data) {
      store.commit(UPDATE_HR_PROGRESS, data)
    },
    updateItCompanies(store, data) {
      store.commit(UPDATE_IT_COMPANIES, data)
    },
    updateSelectedItCompany(store, data) {
      store.commit(UDPATE_SELECTED_IT_COMPANY, data)
    },
    updateSentVacancy(store, data) {
      store.commit(UPDATE_SENT_VACANCY, data)
    },
    updateItCompany(store, data) {
      store.commit(UPDATE_IT_COMPANY, data)
    },
    updateHrPersonalInfo(store, data) {
      store.commit(UPDATE_HR_PERSONAL_INFO, data)
    },
    updateHrVacancies(store, data) {
      store.commit(UPDATE_HR_VACANCIES, data)
    },
    updateHrVacanciesIds(store, data) {
      store.commit(UPDATE_HR_VACANCIES_IDS, data)
    }
  }
}

export default hrManager
