import mutations from './mutations'
import {
  UPDATE_PERSONAL_DATA,
  UPDATE_JOB_DATA,
  UPDATE_PROFILE,
  UPDATE_SENT_REQUEST
} from './constants'

const userManager = {
  state: {
    personalData: null,
    jobData: null,
    profile: 20,
    requestSent: false
  },
  getters: {
    personalData(state) {
      return state.personalData
    },
    jobData(state) {
      return state.jobData
    },
    profile(state) {
      return state.profile
    },
    requestSent(state) {
      return state.requestSent
    }
  },
  mutations,
  actions: {
    updatePersonalData(store, data) {
      store.commit(UPDATE_PERSONAL_DATA, data)
    },
    updateJobData(store, data) {
      store.commit(UPDATE_JOB_DATA, data)
    },
    updateProfile(store, data) {
      store.commit(UPDATE_PROFILE, data)
    },
    updateSentRequest(store, data) {
      store.commit(UPDATE_SENT_REQUEST, data)
    }
  }
}

export default userManager
