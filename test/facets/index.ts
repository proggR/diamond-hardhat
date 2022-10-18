var greeter = require('./Greeter.ts')
var farewell = require('./Farewell.ts')
var persistent1 = require('./Persistent1.ts')
var persistent2 = require('./Persistent2.ts')

const getFacets = () => {
  // return [greeter]
  return [greeter,farewell, persistent1, persistent2]
  // return [greeter,farewell, persistent1]
}

const names = () => {
  // return [greeter.name]
  return [greeter.name,farewell.name, persistent1.name, persistent2.name]
  // return [greeter.name,farewell.name, persistent1.name]
}

exports.greeter = greeter
exports.farewell = farewell
exports.persistent1 = persistent1
exports.persistent2 = persistent2
exports.facetNames = names
exports.getFacets = getFacets

const facets = () => {

}

module.export = facets
