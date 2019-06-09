import { db } from '../../main'
import store from '../../store'

const addJobData = function (data) {
  db.collection('job-details')
    .add(data)
    .then(function() {
      store.dispatch('updateJobData', data)
    })
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

const addRequest = function (data) {
  db.collection('employee-list')
    .add(data)
    .then(function() {
      store.dispatch('updateSentRequest', true)
    })
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

const addPesonalData = function (data, id) {
  db.collection('it-specialists')
    .doc(id)
    .set(data)
    .then(function() {
      store.dispatch('updatePersonalData', data)
    })
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

async function getJobData(id) {
  const usersSnapShot = await db
    .collection('job-details')
    .where('itSpecialistId', '==', id)
    .get()
  let data = []
  for (let doc of usersSnapShot.docs) {
    data.push(doc.data())
  }
  if (data.length > 0) {
    const neededData = data[0]
    store.dispatch('updateJobData', neededData)
  }
}

async function getPersonalData(id) {
  const docRef = db
    .collection('it-specialists')
    .doc(id)
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        const docData = doc.data()
        if (docData.fullName && docData.cv && docData.phone) {
          store.dispatch('updatePersonalData', doc.data())
        }
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error)
    })
}

async function isRequestSent(id) {
  const usersSnapShot = await db
    .collection('employee-list')
    .where('itSpecialistId', '==', id)
    .get()
  let requests = []
  for (let doc of usersSnapShot.docs) {
    requests.push(doc.data())
  }
  if (requests.length > 0) {
    store.dispatch('updateSentRequest', true)
  } else {
    return
  }
}


export {
  addJobData,
  getJobData,
  addPesonalData,
  getPersonalData,
  addRequest,
  isRequestSent
}
