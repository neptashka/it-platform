import { db } from '../../main'

const getItSpecialistsEmployeeList = function() {
  return db.collection('employee-list').orderBy('details')
}

export { getItSpecialistsEmployeeList }
