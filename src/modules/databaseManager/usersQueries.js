import { db } from '../../main'
import store from '../../store'
import { IT_SPECIALIST, HR_MANAGER } from '../../constants/userTypes'
import { isRequestSent } from './profileQueries'
import { getContacts } from './contactsQueries'
import { getItCompanies } from './hrManagerQueries'

/**
 * @function addUser - adds user to collection 'users
 * @param {Object} user, property is email
 */
const addUser = function(user) {
  db.collection('users')
    .add(user)
    .then(function() {})
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

/**
 * @function addTypeUser - adds certain type of user in database
 * @param {Object} user
 * @param {String} collection
 */
const addTypeUser = function(user, collection) {
  db.collection(collection)
    .add(user)
    .then(function(docRef) {
      const userType = collection.slice(0, collection.length - 1)
      addUser({
        email: user.email,
        type: userType,
        userId: docRef.id
      })
      if (userType === IT_SPECIALIST) {
        store.dispatch('updateItSpecialist', {
          email: user.email
        })
      } else {
        getItCompanies()
        store.dispatch('updateHrManager', {
          email: user.email,
          hrManagerId: docRef.id
        })
      }
      store.dispatch('updateUser', {
        email: user.email,
        type: collection.slice(0, collection.length-1),
        userId: docRef.id
      })
    })
    .catch(function(error) {
      alert(`Error ${error}`)
    })
}

/**
 * @function getUserByEmail - gets a current user from database by email
 * @param {String} email
 * @returns {Promise<void>}
 */
async function getUserByEmail(email) {
  const usersSnapShot = await db
    .collection('users')
    .where('email', '==', email)
    .get()
  let users = []
  for (let doc of usersSnapShot.docs) {
    users.push(doc.data())
  }
  if (users.length > 0) {
    const user = users[0]
    store.dispatch('updateUser', user)
    if (user && user.type === IT_SPECIALIST) {
      getItSpecialist(user.userId)
      isRequestSent(user.userId)
    } else if (user && user.type === HR_MANAGER) {
      getHrManager(user.userId)
      getContacts(user.userId)
      getItCompanies()
    }
  }
}

/**
 * @function getItSpecialist - gets information about it specialist from database and updates it in the store
 * @param {String} id
 */
async function getItSpecialist(id) {
  const docRef = db.collection('it-specialists').doc(id)
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        store.dispatch('updateItSpecialist', doc.data())
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error)
    })
}

async function getHrManager(id) {
  const docRef = db.collection('hr-managers').doc(id)
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        store.dispatch('updateHrManager', {
          ...doc.data(),
          hrManagerId: doc.id
        })
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error)
    })
}

async function getUserTypebyEmail(email) {
  const usersSnapShot = await db
    .collection('users')
    .where('email', '==', email)
    .get()
  let users = []
  for (let doc of usersSnapShot.docs) {
    users.push(doc.data())
  }
  if (users.length > 0) {
    const user = users[0]
    return user.type
  }
}

export { getUserByEmail, addTypeUser, addUser, getUserTypebyEmail }
