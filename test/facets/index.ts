var greeter = require('./Greeter.ts')
var farewell = require('./Farewell.ts')
var persistent1 = require('./Persistent1.ts')
var persistent2 = require('./Persistent2.ts')
var mockerc20 = require('./MockERC20.ts')
var mockerc721 = require('./MockERC721.ts')
var mockerc1155 = require('./MockERC1155.ts')

// This is used to test the facets
const enabledFacets = () => {
  // return [mockerc20] // NEW FACET
  return [greeter, farewell, persistent1, persistent2, mockerc1155] // CURRENT WORKING LIST
}

// This is used to deploy the facets
const names = () => {
  var facets = enabledFacets();
  return facets.map((row)=>{return row.name});
}

let availableFacets = {
  greeter:greeter,
  farewell:farewell,
  persistent1:persistent1,
  persistent2:persistent2,
  mockerc20:mockerc20,
  mockerc721:mockerc721,
  mockerc1155:mockerc1155,
  facetNames:names,
  enabledFacets:enabledFacets
}

exports.facets = availableFacets
