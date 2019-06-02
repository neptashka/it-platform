import { db } from '../../main'
import store from '../../store'

/**
 * @function _getUserType - asynchronous function to get type of current registered user
 * @returns {Promise<*>} - Object of current user: id, type
 */
async function getUserType() {
  const userEmail = store.state.userManager.user.email
  const usersSnapShot = await db
    .collection('users')
    .where('email', '==', userEmail)
    .get()
  let users = []
  for (let doc of usersSnapShot.docs) {
    users.push({
      id: doc.data().userId,
      collection: doc.data().type
    })
  }
  if (users.length > 0) {
    return users[0]
  }
}

/**
 * @function getCurrentUser - gets a current user from database
 * @returns {Promise<void>} - Object
 */
async function getCurrentUser() {
  const userType = await getUserType()
  const docRef = db
    .collection(userType.collection)
    .doc(userType.id)
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        store.dispatch('updateUser', doc.data())
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error)
    })
}

const getItSpecialists = () => {
  return db
    .collection('it-specialists')
    .where('email', '==', 'anna.apunevych@gmail.com')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`Doc id: ${doc.data()}}`)
      })
    })
}

const addITSpecialist = (user, collection) => {
  db.collection(collection)
    .add(user)
    .then(function(docRef) {
      alert(`User was added`)
    })
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

export { getItSpecialists, getUserType, addITSpecialist, getCurrentUser }
