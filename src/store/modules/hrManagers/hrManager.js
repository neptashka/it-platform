import mutations from './mutations'
import { UPDATE_HR_CONTACT, UPDATE_HR_PROGRESS, UPDATE_IT_COMPANIES, UDPATE_SELECTED_IT_COMPANY, UPDATE_SENT_VACANCY } from './constants'

const hrManager = {
  state: {
    hrContact: null,
    hrProgress: 20,
    itCompanies: [],
    selectedItCompany: null,
    sentVacancy: null
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
    }
  }
}

export default hrManager
