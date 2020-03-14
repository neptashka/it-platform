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

const addItCompany = function(data) {
  db.collection('it-companies')
    .add(data)
    .then(function() {})
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

const updateHrVacancies = function(hrVacancies, userId) {
  const docRef = db.collection('hr-managers').doc(userId)
  docRef
    .update({
      vacancies: hrVacancies
    })
    .then(function() {})
    .catch(function(error) {
      console.error('Error updating document: ', error)
    })
}

const addHrCompany = function(data, id) {
  db.collection('hr-managers')
    .doc(id)
    .set(data)
    .then(function() {
      store.dispatch('updatePersonalData', data)
    })
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

const addPersonalInfo = function(data, id) {
  db.collection('hr-managers')
    .doc(id)
    .set(data)
    .then(function() {
      store.dispatch('updatePersonalData', data)
    })
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

async function getHrInfo(id) {
  const docRef = db.collection('hr-managers').doc(id)
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        const docData = doc.data()
        if (docData.fullName && docData.image) {
          store.dispatch('updateHrPersonalInfo', {
            fullName: docData.fullName,
            image: docData.image
          })
        } else {
          store.dispatch('updateHrPersonalInfo', null)
        }
        if (docData.company) {
          store.dispatch('updateItCompany', { ...docData.company })
        } else {
          store.dispatch('updateItCompany', null)
        }
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error)
    })
}

const initHrVacancies = async function(userId) {
  const docRef = db.collection('hr-managers').doc(userId)
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        if (doc.data().vacancies && doc.data().vacancies.length > 0) {
          const vacanciesIds = doc.data().vacancies
          store.dispatch('updateHrVacanciesIds', vacanciesIds)
          getVacanciesByIds(vacanciesIds)
        }
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error)
    })
}

const getVacanciesByIds = async function(vacancies) {
  const docRef = db.collection('vacancies')
  store.dispatch('updateHrVacancies', [])
  vacancies.forEach(vacancyId => {
    docRef
      .doc(vacancyId)
      .get()
      .then(function(doc) {
        const vacanciesInStore = store.state.hrManager.hrVacancies
        store.dispatch('updateHrVacancies', [
          ...vacanciesInStore,
          { ...doc.data(), id: doc.id }
        ])
      })
  })
}

export {
  getItCompanies,
  addItCompany,
  addHrCompany,
  getHrInfo,
  addPersonalInfo,
  updateHrVacancies,
  initHrVacancies
}
