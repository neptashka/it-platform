import mutations from './mutations'
import {
  UPDATE_USER,
  UPDATE_USER_TYPE,
  UPDATE_IT_SPECIALIST,
  UPDATE_HR_MANAGER
} from './constants'

const userManager = {
  state: {
    user: null,
    userType: null,
    itSpecialist: null,
    hrManager: null
  },
  getters: {
    user(state) {
      return state.user
    },
    userType(state) {
      return state.user
    },
    itSpecialist(state) {
      return state.itSpecialist
    },
    hrManager(state) {
      return state.hrManager
    }
  },
  mutations,
  actions: {
    updateUser(store, user) {
      store.commit(UPDATE_USER, user)
    },
    updateUserType(store, type) {
      store.commit(UPDATE_USER_TYPE, type)
    },
    updateItSpecialist(store, user) {
      store.commit(UPDATE_IT_SPECIALIST, user)
    },
    updateHrManager(store, user) {
      store.commit(UPDATE_HR_MANAGER, user)
    }
  }
}

export default userManager
