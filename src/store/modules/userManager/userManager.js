import mutations from './mutations'
import {
  UPDATE_USER
} from './constants'

const userManager = {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations,
  actions: {
    updateUser(store, user) {
      store.commit(UPDATE_USER, user)
    }
  }
}

export default userManager
