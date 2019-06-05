import mutations from './mutations'
import { UPDATE_HR_CONTACT, UPDATE_HR_PROGRESS } from './constants'

const hrManager = {
  state: {
    hrContact: null,
    hrProgress: 0
  },
  getters: {
    hrContact(state) {
      return state.hrContact
    },
    hrProgress(state) {
      return state.hrProgress
    }
  },
  mutations,
  actions: {
    updateHrContact(store, data) {
      store.commit(UPDATE_HR_CONTACT, data)
    },
    updateHrProgress(store, data) {
      store.commit(UPDATE_HR_PROGRESS, data)
    }
  }
}

export default hrManager
