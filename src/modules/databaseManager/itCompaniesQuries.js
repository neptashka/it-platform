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
    .doc(companyId)con
  const hrInfo = await hrSnapshot.get()
  return hrInfo.data()
}

export {
  getCompanyInfo,
  getHrInfo
}
