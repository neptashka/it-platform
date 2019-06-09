import { db } from '../../main'
import { getCompanyInfo, getHrInfo } from './itCompaniesQuries'
import store from '../../store'

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

export {
  getVacancies,
  getRequests,
  addVacancyToDb
}
