import { db } from '../../main'
import { getCompanyInfo, getHrInfo } from './itCompaniesQuries'
import store from '../../store'
import {HR_MANAGER, IT_SPECIALIST} from '../../constants/userTypes'
import {isRequestSent} from './profileQueries'
import {getContacts} from './contactsQueries'
import {getItCompanies} from './hrManagerQueries'

/**
 * @function getVacancies - asynchronous function to get all vacancies
 * @returns {Promise<*>} - Array of vacancies
 */
async function getVacancies() {
  const vacanciesSnapShot = await db
    .collection('vacancies')
    .get()
  let vacancies = []
  for (let doc of vacanciesSnapShot.docs) {
    const companyId = doc.data().companyId
    const hrId = doc.data().hrManagerId
    const company = companyId ? await getCompanyInfo(companyId) : {}
    const hrManager = hrId ? await getHrInfo(hrId) : {}
    vacancies.push({
      id: doc.id,
      content: doc.data(),
      company,
      hrManager
    })
  }
  store.dispatch('updateVacancies', vacancies)
  store.dispatch('initFilteredVacancies', vacancies)
}

async function getRequests() {
  const vacanciesSnapShot = await db
    .collection('employee-list')
    .get()
  let vacancies = []
  for (let doc of vacanciesSnapShot.docs) {
    vacancies.push(doc.data())
  }
  store.dispatch('updateRequests', vacancies)
  store.dispatch('initFilteredRequests', vacancies)
}

const addVacancyToDb = function(vacancy) {
  db.collection('vacancies')
    .add(vacancy)
    .then(function(docRef) {})
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

async function getHrManagerId(email) {
  const hrManagerSnapSHot = await db
    .collection('hr-managers')
    .where('email', '==', email)
    .get()
  let hrs = []
  for (let doc of hrManagerSnapSHot.docs) {
    hrs.push(doc.id)
  }
  return hrs[0]
}

export {
  getVacancies,
  getRequests,
  addVacancyToDb,
  getHrManagerId
}
