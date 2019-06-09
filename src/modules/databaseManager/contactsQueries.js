import { db } from '../../main'
import store from '../../store'
import { HR_MANAGER, IT_SPECIALIST } from '../../constants/userTypes'
import { isRequestSent } from './profileQueries'
import { getCompanyInfo, getHrInfo } from './itCompaniesQuries'

const sendContacts = function(data) {
  db.collection('send-contacts')
    .add(data)
    .then(function(docRef) {})
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

async function getContacts(id) {
  const usersSnapShot = await db
    .collection('send-contacts')
    .where('hrId', '==', id)
    .get()
  let contacts = []
  for (let doc of usersSnapShot.docs) {
    contacts.push(doc.data())
  }
  if (contacts.length > 0) {
    const contact = contacts[0]
    const id = contact.itSpecialistId
    const personalInfo = await getPersonalInfo(id)
    const jobInfo = await getJobInfo(id)
    const result = { ...personalInfo, ...jobInfo }
    store.dispatch('updateHrContact', result)
  }
}

async function getPersonalInfo(id) {
  const companiesSnapshot = db
    .collection('it-specialists')
    .doc(id)
  const personalInfo = await companiesSnapshot.get()
  return personalInfo.data()
}

async function getJobInfo(id) {
  const companiesSnapshot = await db
    .collection('job-details')
    .where('itSpecialistId', '==', id)
    .get()
  let contacts = []
  for (let doc of companiesSnapshot.docs) {
    contacts.push(doc.data())
  }
  if (contacts.length > 0) {
    return contacts[0]
  }
}

export { sendContacts, getContacts }
