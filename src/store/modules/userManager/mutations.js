import {
  UPDATE_USER,
  UPDATE_USER_TYPE,
  UPDATE_HR_MANAGER,
  UPDATE_IT_SPECIALIST
} from './constants'

export default {
  [UPDATE_USER](state, user) {
    state.user = user
  },
  [UPDATE_USER_TYPE](state, type) {
    state.userType = type
  },
  [UPDATE_HR_MANAGER](state, user) {
    state.hrManager = user
  },
  [UPDATE_IT_SPECIALIST](state, user) {
    state.itSpecialist = user
  }
}
