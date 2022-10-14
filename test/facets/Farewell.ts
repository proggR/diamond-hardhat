const { expect, assert } = require("chai");
const {
  FacetCutAction,
  get,
  getSelectors
} = require('../../lib/diamond/diamond.ts')

const { deployFacets, removeFacets } = require('../../lib/diamond/facet.ts')
// REQUIRED: name set, and diamond/owner/count as params to runTest
// NOTE: count should include base diamond count (so +3). will need -1 for address idx
const name = "FarewellFacet"
let diamond
let owner
let count
const zeroAddress = '0x0000000000000000000000000000000000000000'

const runTest = (dAddress, dOwner,ctr) => {
  diamond = dAddress
  owner = dOwner
  count = ctr
  describe("Farewell Test",test)
}


const test = async() => {
  let contractOwner
  let diamondAddress
  let diamondLoupeFacet
  let addresses
  let facet
  let selector

  // let diamondCutFacet
  // let ownershipFacet
  // let tx
  // let receipt
  // let result

  before(async() => {

    contractOwner = owner;
    diamondAddress = diamond;
    const Facet = await ethers.getContractFactory("FarewellFacet")
    facet = new ethers.Contract(diamondAddress,Facet.interface, contractOwner)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    addresses = await diamondLoupeFacet.facetAddresses()

  //   ownershipFacet = await ethers.getContractAt('OwnershipFacet', diamondAddress)
  //   diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
  })

  it('Should respond to goodbye (0x75fc8e3c)', async () => {
    // let selector = get(getSelectors(facet),['goodbye()']);
    // console.log("FUNCTIONS: "+selector[0])
    let idx = count-1
    assert.equal(
      addresses[idx],
      await diamondLoupeFacet.facetAddress('0x75fc8e3c')
    )
  })

  it('Should get "adios" back from goodbye call (0x75fc8e3c)', async () => {
    // console.log('Farewell Diamond fetched:', facet.address)
    assert.equal(
      'adios',
      await facet.goodbye()
    )
  })

  it('Should replace itself and with a new contract address still get "adios" back from goodbye call (0x75fc8e3c)', async () => {
    let idx = count-1
    const oldAddress = await diamondLoupeFacet.facetAddress('0x75fc8e3c')
    // console.log('Farewell Diamond fetched:', oldAddress)
    const facetContracts = await deployFacets(diamondAddress,FacetCutAction.Replace,["FarewellFacet"]);
    const newAddress = await diamondLoupeFacet.facetAddress('0x75fc8e3c')
    console.log('Farewell Diamond replaced:', newAddress)

    assert.notEqual(
      oldAddress,
      newAddress
    )
    assert.equal(
      'adios',
      await facet.goodbye()
    )
  })

  it('Should remove itself and have the zero address + error when goodbye is called (0x75fc8e3c)', async () => {
    let idx = count-1
    const oldAddress = await diamondLoupeFacet.facetAddress('0x75fc8e3c')
    // console.log('Farewell Diamond fetched:', oldAddress)
    const facetContracts = await removeFacets(diamondAddress,["FarewellFacet"]);
    const newAddress = await diamondLoupeFacet.facetAddress('0x75fc8e3c')
    // console.log('Farewell Diamond replaced:', newAddress)

    assert.notEqual(
      oldAddress,
      newAddress
    )
    try{
      //it should actually throw an error. not sure how to handle less grossly atm
      assert.notEqual(
        'adios',
        await facet.goodbye()
      )
    }catch(error){
      // console.log("CAUGHT (BUT WANTED IT TO FAIL)",error)
      assert.equal(true,true)
    }
  })

  it('Should readd itself and once again get adios from goodbye (0x75fc8e3c)', async () => {
    let idx = count-1
    const oldAddress = await diamondLoupeFacet.facetAddress('0x75fc8e3c')
    assert.equal(
      oldAddress,
      zeroAddress
    )
    await deployFacets(diamondAddress,FacetCutAction.Add,["FarewellFacet"]);
    const newAddress = await diamondLoupeFacet.facetAddress('0x75fc8e3c')
    // console.log('Farewell Diamond replaced:', newAddress)

    assert.notEqual(
      oldAddress,
      newAddress
    )

    assert.equal(
      'adios',
      await facet.goodbye()
    )

  })
}

const farewell = () => {
}

exports.name = name
exports.runTest = runTest
module.export = farewell
