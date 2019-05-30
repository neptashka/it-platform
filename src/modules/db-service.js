import { db } from '../main'

const getItSpecialists = () => {
  return db
    .collection('it-specialists')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`Doc id: ${doc.id}}`)
      })
    })
}

const addITSpecialist = user => {
  db.collection('it-specialists')
    .add(user)
    .then(function(docRef) {
      alert(`User was added with id ${docRef}`)
    })
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

export {
  getItSpecialists,
  addITSpecialist
}
