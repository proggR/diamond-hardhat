/* global ethers */

const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 }

const selector = (facet) => {
  let selection = get(getSelectors(facet),['goodbye()']);
  console.log("FUNCTIONS: "+selection[0])
}

// get function selectors from ABI
const getSelectors = (contract) => {
  const signatures = Object.keys(contract.interface.functions)
  const selectors = signatures.reduce((acc, val) => {
    if (val !== 'init(bytes)') {
      acc.push(contract.interface.getSighash(val))
    }
    return acc
  }, [])
  selectors.contract = contract
  // selectors.remove = remove
  // selectors.get = get
  return selectors
}

// get function selector from function signature
const getSelector = (func) => {
  const abiInterface = new ethers.utils.Interface([func])
  return abiInterface.getSighash(ethers.utils.Fragment.from(func))
}

// used with getSelectors to remove selectors from an array of selectors
// functionNames argument is an array of function signatures
const remove = (that, functionNames) => {
  const selectors = that.filter((v) => {
    for (const functionName of functionNames) {
      if (v === that.contract.interface.getSighash(functionName)) {
        return false
      }
    }
    return true
  })
  selectors.contract = that.contract
  // selectors.remove = this.remove
  // selectors.get = this.get
  return selectors
}

// used with getSelectors to get selectors from an array of selectors
// functionNames argument is an array of function signatures
const get = (that, functionNames) => {
  const selectors = that.filter((v) => {
    for (const functionName of functionNames) {
      if (v === that.contract.interface.getSighash(functionName)) {
        return true
      }
    }
    return false
  })
  selectors.contract = that.contract
  // selectors.remove = this.remove
  // selectors.get = this.get
  return selectors
}

// remove selectors using an array of signatures
const removeSelectors = (selectors, signatures) => {
  const iface = new ethers.utils.Interface(signatures.map(v => 'function ' + v))
  const removeSelectors = signatures.map(v => iface.getSighash(v))
  selectors = selectors.filter(v => !removeSelectors.includes(v))
  return selectors
}

// find a particular address position in the return value of diamondLoupeFacet.facets()
const findAddressPositionInFacets = (facetAddress, facets) => {
  for (let i = 0; i < facets.length; i++) {
    if (facets[i].facetAddress === facetAddress) {
      return i
    }
  }
}

const diamondLib = () => {}

exports.getSelectors = getSelectors
exports.get = get
exports.FacetCutAction = FacetCutAction

exports.getSelector = getSelector
exports.remove = remove
exports.removeSelectors = removeSelectors
exports.findAddressPositionInFacets = findAddressPositionInFacets

module.export = diamondLib
