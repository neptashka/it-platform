import { UPDATE_USER } from './constants'

export default {
  [UPDATE_USER](state, user) {
    state.user = user
  }
}
