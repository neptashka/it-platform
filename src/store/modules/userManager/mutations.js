import {
  UPDATE_USER,
  UPDATE_USER_TYPE,
  UPDATE_HR_MANAGER,
  UPDATE_IT_SPECIALIST,
  UPDATE_DEV_IMAGE
} from './constants'
import _set from 'lodash/set'

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
  },
  [UPDATE_DEV_IMAGE](state, image) {
    _set(state, 'itSpecialist.image', image)
  }
}
