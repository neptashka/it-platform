import { db } from '../../main'

async function getCompanyInfo(companyId) {
  const companiesSnapshot = db
    .collection('it-companies')
    .doc(companyId)
  const companyInfo = await companiesSnapshot.get()
  return companyInfo.data()
}

async function getHrInfo(companyId) {
  const hrSnapshot = db
    .collection('hr-managers')
    .doc(companyId)
  const hrInfo = await hrSnapshot.get()
  return hrInfo.data()
}

async function getCompanies() {
  const companies = await db
    .collection('it-companies')
    .get()
  let companiesArray = []
  for (let doc of companies.docs) {
    companiesArray.push(doc.data().name)
  }
  return companiesArray
}

export {
  getCompanyInfo,
  getHrInfo,
  getCompanies
}
