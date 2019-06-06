import { db } from '../../main'
import store from '../../store'

async function getItCompanies() {
  const vacanciesSnapShot = await db.collection('it-companies').get()
  let vacancies = []
  for (let doc of vacanciesSnapShot.docs) {
    vacancies.push({ ...doc.data(), id: doc.id })
  }
  store.dispatch('updateItCompanies', vacancies)
}
export {
	getItCompanies
}
