const { expect, assert } = require("chai");
const {
  get,
  getSelectors,
} = require('../../lib/diamond/diamond.ts')
// REQUIRED: name set, and diamond/owner/count as params to runTest
// NOTE: count should include base diamond count (so +3). will need -1 for address idx
const name = "GreeterFacet"
let diamond
let owner
let count

const runTest = (dAddress, dOwner,ctr) => {
  diamond = dAddress
  owner = dOwner
  count = ctr
  describe("Greeter Test",test)
}

const test = async() => {
  let contractOwner
  let diamondAddress
  let addresses
  let facet
  let diamondLoupeFacet


  // let diamondCutFacet
  // let ownershipFacet
  // let tx
  // let receipt
  // let result

  before(async() => {
    contractOwner = owner;
    diamondAddress = diamond;
    const Facet = await ethers.getContractFactory("GreeterFacet")
    facet = new ethers.Contract(diamondAddress,Facet.interface, contractOwner)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    addresses = await diamondLoupeFacet.facetAddresses()

    //   diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    //   ownershipFacet = await ethers.getContractAt('OwnershipFacet', diamondAddress)
  })


  it('Should respond to hello (0x19ff1d21)', async () => {
    let selector = get(getSelectors(facet),['hello()']);
    console.log("FUNCTIONS: "+selector[0])
    let idx = count-1

    assert.equal(
      addresses[idx],
      await diamondLoupeFacet.facetAddress('0x19ff1d21')
    )
  })

  it('Should get "hola" back from hello call (0x19ff1d21)', async () => {
    // console.log('Greeter Diamond fetched:', facet.address)
    assert.equal(
      'hola',
      await facet.hello()
    )
  })
}

const greeter = () => {
}

exports.name = name
exports.runTest = runTest
module.export = greeter
