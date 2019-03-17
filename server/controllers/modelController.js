const find = require('lodash/find')
const get = require('lodash/get')

const getElement = (elements) => (filters, defaultValue) => {
  const element = find(elements, filters)
  return element || defaultValue
}

getPart = (elements) => (path, defaultValue = {}) => {
  return get(elements, path, defaultValue)
}

module.exports = {
  getElement,
  getPart
}
