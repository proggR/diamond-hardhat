var greeter = require('./Greeter.ts')
var farewell = require('./Farewell.ts')
var persistent1 = require('./Persistent1.ts')
var persistent2 = require('./Persistent2.ts')
var mockerc20 = require('./MockERC20.ts')
var mockerc721 = require('./MockERC721.ts')

// @NOTE: The comments
// Still super jank version that's limiting in many ways, the comments attempt to
// describe a semi-functional workflow with these tests I want to expand into
// something more Terraform-esque involving statefiles
// I usually take great pleasure in killing comments in code (unless Annotations
// are being used), but this file particularly is a crude work in progress that's
// capable of becoming so much more once the strange manual testing phase is more
// refined and a config + statefile makes the tasks + evolving libraries turn this
// nascent standard into the new normal way to imagine smart contract development.
//
// That's my dream
// That's what I want to make... because then I can make _all the things!_


// This is used to test the facets
const getFacets = () => {
  // return [mockerc20] // NEW FACET
  // return [greeter,farewell, persistent1, persistent2, mockerc20]  // DESIRED FULL LIST
  // return [greeter,farewell, persistent1, persistent2]
  // return [greeter,farewell, persistent1, persistent2,mockerc20] // CURRENT WORKING LIST
  return [greeter,farewell, persistent1, persistent2,mockerc721] // CURRENT WORKING LIST
}

// This is used to deploy the facets
const names = () => {
  // return [mockerc20.name] // NEW FACET
  // return [greeter.name,farewell.name, persistent1.name, persistent2.name, mockerc20.name]   // DESIRED FULL LIST
  // return [greeter.name,farewell.name, persistent1.name, persistent2.name]
  // return [greeter.name, farewell.name, persistent1.name, persistent2.name, mockerc20.name] // CURRENT WORKING LIST
  return [greeter.name, farewell.name, persistent1.name, persistent2.name, mockerc721.name] // CURRENT WORKING LIST
}

let availableFacets = {
  greeter:greeter,
  farewell:farewell,
  persistent1:persistent1,
  persistent2:persistent2,
  mockerc20:mockerc20,
  mockerc721:mockerc721,
  facetNames:names,
  getFacets:getFacets
}

exports.facets = availableFacets
