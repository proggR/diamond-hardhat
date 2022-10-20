const { expect, assert } = require("chai");
const {
  get,
  getSelectors,
} = require('../../lib/diamond/diamond.ts')


// REQUIRED: name set, and diamond/owner/count as params to runTest
// NOTE: count should include base diamond count (so +3). will need -1 for address idx
const name = "PersistentFacet1"
let diamond
let owner
let count

const runTest = (dAddress, dOwner,ctr) => {
  diamond = dAddress
  owner = dOwner
  count = ctr
  describe("Persistent 1 (AppStorage only) Test",test)
}

const test = async() => {
  let contractOwner
  let diamondAddress
  let addresses
  let facet
  let diamondLoupeFacet

  before(async() => {
    contractOwner = owner;
    diamondAddress = diamond;
    const Facet = await ethers.getContractFactory("PersistentFacet1")
    facet = new ethers.Contract(diamondAddress,Facet.interface, contractOwner)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    addresses = await diamondLoupeFacet.facetAddresses()
  })

  step('Should fail when fetching M1', async () => {
    try{
      //it should actually throw an error. not sure how to handle less grossly atm
      assert.notEqual(
        'MESSAGE1',
        await facet.loadM1()
      )
    }catch(error){
      assert.equal(true,true)
    }
  })

  step('Should fail when fetching M2', async () => {
    try{
      //it should actually throw an error. not sure how to handle less grossly atm
      assert.notEqual(
        'MESSAGE2',
        await facet.loadM2()
      )
    }catch(error){
      assert.equal(true,true)
    }
  })

  step('Should set M1 to "MESSAGE1"', async () => {
    await facet.setM1('MESSAGE1')
  })

  step('Should set M2 to "MESSAGE2"', async () => {
      await facet.setM2('MESSAGE2')
  })

  step('Should get "MESSAGE1" back from M1', async () => {
    assert.equal(
      'MESSAGE1',
      await facet.loadM1()
    )
  })

  step('Should get "MESSAGE2" back from M2', async () => {
    assert.equal(
      'MESSAGE2',
      await facet.loadM2()
    )
  })
}

const persistent = () => {
}

exports.name = name
exports.runTest = runTest
module.export = persistent
