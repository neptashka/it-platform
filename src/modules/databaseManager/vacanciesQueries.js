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
    const company = await getCompanyInfo(companyId)
    const hrManager = await getHrInfo(hrId)
    vacancies.push({
      content: doc.data(),
      company,
      hrManager
    })
  }
  store.dispatch('updateVacancies', vacancies)
}

export {
  getVacancies
}
