import _every from 'lodash/every'
import _values from 'lodash/values'

export const isEmptyObject = obj =>
  Object.entries(obj).length === 0 && obj.constructor === Object

export const allFalseValues = obj =>
  _every(_values(obj), v => !v)
