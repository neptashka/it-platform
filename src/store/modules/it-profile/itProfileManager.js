import mutations from './mutations'
import {
  UPDATE_PERSONAL_DATA,
  UPDATE_JOB_DATA
} from './constants'

const userManager = {
  state: {
    personalData: null,
    jobData: null
  },
  getters: {
    personalData(state) {
      return state.personalData
    },
    jobData(state) {
      return state.jobData
    }
  },
  mutations,
  actions: {
    updatePersonalData(store, data) {
      store.commit(UPDATE_PERSONAL_DATA, data)
    },
    updateJobData(store, data) {
      store.commit(UPDATE_JOB_DATA, data)
    }
  }
}

export default userManager
