/**
 * @function filteredVacanciesArrayByArray - filters array on having intersection in property with filter
 * @param {Array} vacancies - all vacancies array
 * @param {Array} filter - array of filters
 * @param {String} str - property name
 * @returns {Array} of vacancies
 */
export const filteredVacanciesArrayByArray = (vacancies, filter, str) =>
  vacancies.filter(vacancy =>
    vacancy[str].filter(lang =>
      filter.includes(lang)).length > 0)

/**
 * @function filteredVacanciesByArray - filters array on having intersection in property with filter
 * @param {Array} vacancies - all vacancies array
 * @param {Array} filter - array of filters
 * @param {String} str - property name
 * @returns {Array} of vacancies
 */
export const filteredVacanciesByArray = (vacancies, filter, str) =>
  vacancies.filter(vacancy =>
    filter.includes(vacancy[str]))

/**
 * @function filteredVacanciesByString - fiters array on includeing filter in property
 * @param {Array} vacancies
 * @param {String} filter
 * @param {String} property name
 * @returns {Array} of vacancies
 */
export const filteredVacanciesByString = (vacancies, filter, property) =>
  vacancies.filter(vacancy => vacancy[property] === filter)

/**
 * @function getIntersection
 * @param {Array} filtersArray
 * @returns {Array} of finally filtered vacancies
 */
export const getIntersection = filtersArray =>
  filtersArray.reduce((acc, curArr) => {
    return acc.filter(el => curArr.includes(el))
  }, filtersArray[0])
