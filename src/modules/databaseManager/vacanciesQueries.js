import { db } from '../../main'
import store from '../../store'
import { updateHrVacancies } from './hrManagerQueries'

async function getAllVacancies() {
  const vacanciesSnapShot = await db
    .collection('vacancies')
    .get()
  let vacancies = []
  for (let doc of vacanciesSnapShot.docs) {
    vacancies.push({
      id: doc.id,
      ...doc.data()
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

const addVacancyToDb = function(vacancy, vacanciesIds, userId) {
  db.collection('vacancies')
    .add(vacancy)
    .then(function(docRef) {
      const vacancies = [...vacanciesIds, docRef.id]
      store.dispatch('updateHrVacanciesIds', vacancies)
      updateHrVacancies(vacancies, userId)
    })
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

async function getPopularVacancies() {
  const snapshot = await db
    .collection('send-contacts')
    .get()
  let popularVacanciesId = []
  for (let doc of snapshot.docs) {
    popularVacanciesId.push(doc.data().vacancyId)
  }
  popularVacanciesId = [...new Set(popularVacanciesId)]
  let popularVacancies = []
  for (let i = 0; i < popularVacanciesId.length; i++) {
    const vacancy = await db
      .collection('vacancies')
      .doc(popularVacanciesId[i])
      .get()
    popularVacancies.push(vacancy.data())
  }
  return popularVacancies
}

export {
  // getVacancies,
  getRequests,
  addVacancyToDb,
  getPopularVacancies,
  getAllVacancies
}
