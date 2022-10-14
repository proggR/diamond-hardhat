var greeter = require('./Greeter.ts')
var farewell = require('./Farewell.ts')

const getFacets = () => {
  // return [greeter]
  return [greeter,farewell]
}

const names = () => {
  // return [greeter.name]
  return [greeter.name,farewell.name]
}

exports.greeter = greeter
exports.farewell = farewell
exports.facetNames = names
exports.getFacets = getFacets

const facets = () => {

}

module.export = facets
