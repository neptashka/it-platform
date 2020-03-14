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

async function getContacts(id, vacancies) {
  const usersSnapShot = await db
    .collection('send-contacts')
    .where('hrId', '==', id)
    .get()
  let contacts = []
  for (let doc of usersSnapShot.docs) {
    contacts.push(doc.data())
  }
  let contactsArray = []
  if (contacts.length > 0) {
    for (let i = 0; i < contacts.length; i++) {
      const itSpecialistId = contacts[i].itSpecialistId
      const personalInfo = await getPersonalInfo(itSpecialistId)
      const jobInfo = await getJobInfo(itSpecialistId)
      const vacancyId = contacts[i].vacancyId
      contactsArray.push({
        vacancyId,
        content: { ...personalInfo, ...jobInfo }
      })
      // vacancies.forEach((vacancy, index) => {
      //   if (vacancy.id === vacancyId) {
      //     if (vacancy['contact']) {
      //       vacancies[index].contact.push({ ...personalInfo, ...jobInfo })
      //     } else {
      //       vacancies[index].contact = [{ ...personalInfo, ...jobInfo }]
      //     }
      //   }
      // })
    }
    vacancies.forEach(vacancy => (vacancy['contact'] = []))
    contactsArray.forEach(contact => {
      const vacancy = vacancies.find(el => el.id === contact.vacancyId)
      const vacancyIndex = vacancies.indexOf(vacancy)
      if (vacancyIndex > -1) {
        vacancies[vacancyIndex].contact.push(contact.content)
      }
    })
    store.dispatch('updateHrVacancies', vacancies)
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
