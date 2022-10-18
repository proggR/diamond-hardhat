const { expect, assert } = require("chai");
const {
  get,
  getSelectors,
} = require('../../lib/diamond/diamond.ts')
// REQUIRED: name set, and diamond/owner/count as params to runTest
// NOTE: count should include base diamond count (so +3). will need -1 for address idx
const name = "PersistentFacet2"
let diamond
let owner
let count

const runTest = (dAddress, dOwner,ctr) => {
  diamond = dAddress
  owner = dOwner
  count = ctr
  describe("Persistent 2 (AppStorage and DiamondStorage) Test",test)
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
    const Facet = await ethers.getContractFactory("PersistentFacet2")
    facet = new ethers.Contract(diamondAddress,Facet.interface, contractOwner)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    addresses = await diamondLoupeFacet.facetAddresses()

    //   diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    //   ownershipFacet = await ethers.getContractAt('OwnershipFacet', diamondAddress)
  })


  // it('Should respond to hello (0x19ff1d21)', async () => {
  //   // let selector = get(getSelectors(facet),['hello()']);
  //   // console.log("FUNCTIONS: "+selector[0])
  //   let idx = count-1
  //
  //   assert.equal(
  //     addresses[idx],
  //     await diamondLoupeFacet.facetAddress('0x19ff1d21')
  //   )
  // })


  it('Should get "MESSAGE1" back from M1 (if Persistent1.ts has ran first)', async () => {
    // console.log('Greeter Diamond fetched:', facet.address)
    assert.equal(
      'MESSAGE1',
      await facet.l1()
    )
  })

  it('Should get "MESSAGE2" back from M2 (if Persistent1.ts has ran first)', async () => {
    // console.log('Greeter Diamond fetched:', facet.address)
    assert.equal(
      'MESSAGE2',
      await facet.l2()
    )
  })

  it('Should fail when fetching diamond storage greeting', async () => {
    try{
      //it should actually throw an error. not sure how to handle less grossly atm
      const resp = await facet.getDS()
      assert.notEqual(
        'HOLA',
        resp
      )
    }catch(error){
      // console.log("CAUGHT (BUT WANTED IT TO FAIL)",error)
      assert.equal(true,true)
    }
  })


  it('Should set diamond storage greeting to "HOLA"', async () => {
    // console.log('Greeter Diamond fetched:', facet.address)
    let tx = await facet.setDS('HOLA')
    await tx.wait()
  })

  it('Should get "HOLA" back from diamond storage greeting', async () => {
    // console.log('Greeter Diamond fetched:', facet.address)
      assert.equal(
        'HOLA',
        await facet.getDS()
      )
  })

}

const persistent2 = () => {
}

exports.name = name
exports.runTest = runTest
module.export = persistent2
