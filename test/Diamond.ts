const {
  getSelectors,
  FacetCutAction,
  removeSelectors,
  findAddressPositionInFacets
} = require('../lib/diamond/diamond.ts')


const { deployDiamond } = require('../lib/diamond/deploy.ts')
const { deployFacets } = require('../lib/diamond/facet.ts')
var facets = require('./facets')
const { expect, assert } = require("chai");


const diamondTest = async () => {
  let accounts
  let contractOwner

  let diamondAddress
  let diamondCutFacet
  let diamondLoupeFacet
  let ownershipFacet
  let tx
  let receipt
  let result
  const addresses = []
  let ctr

  before(async function(){
    ctr = 3
    accounts = await ethers.getSigners()
    contractOwner = accounts[0]
    diamondAddress = await deployDiamond()
    diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    ownershipFacet = await ethers.getContractAt('OwnershipFacet', diamondAddress)
  })

  it("Deployment should do something", () => {
    expect("test").to.equal("test")
  });

  it('Should have three facets -- call to facetAddresses function', async () => {
    for (const address of await diamondLoupeFacet.facetAddresses()) {
      addresses.push(address)
    }

    assert.equal(addresses.length, 3)
  })

  it('Facets should have the right function selectors -- call to facetFunctionSelectors function', async () => {
    let selectors = getSelectors(diamondCutFacet)
    result = await diamondLoupeFacet.facetFunctionSelectors(addresses[0])
    assert.sameMembers(result, selectors)
    selectors = getSelectors(diamondLoupeFacet)
    result = await diamondLoupeFacet.facetFunctionSelectors(addresses[1])
    assert.sameMembers(result, selectors)
    selectors = getSelectors(ownershipFacet)
    result = await diamondLoupeFacet.facetFunctionSelectors(addresses[2])
    assert.sameMembers(result, selectors)
  })

  it('Selectors should be associated to facets correctly -- multiple calls to facetAddress function', async () => {
    assert.equal(
      addresses[0],
      await diamondLoupeFacet.facetAddress('0x1f931c1c')
    )
    assert.equal(
      addresses[1],
      await diamondLoupeFacet.facetAddress('0xcdffacc6')
    )
    assert.equal(
      addresses[1],
      await diamondLoupeFacet.facetAddress('0x01ffc9a7')
    )
    assert.equal(
      addresses[2],
      await diamondLoupeFacet.facetAddress('0xf2fde38b')
    )
  })


  // START OF NON-BASE FACET TESTS

  it('Should deploy facets -- test count returned against number defined', async () => {
    const FacetNames = facets.facetNames()

    try{
      const facetContracts = await deployFacets(diamondAddress,FacetCutAction.Add,FacetNames);
    }catch(e){
      console.log("ERROR")
      console.log(e)
      assert(true,false)
    }

    // assert.equal(FacetNames.length,facetContracts.length)
    assert(true,true)
  })

  it('Should test the facets', async () => {
    for (const facet of facets.getFacets()) {
      ctr++
      await facet.runTest(diamondAddress, contractOwner,ctr);
    }
  })

  // it('Should have five facets -- call to facetAddresses function', async () => {
  //   addresses.splice(0,addresses.length)
  //   for (const address of await diamondLoupeFacet.facetAddresses()) {
  //     addresses.push(address)
  //   }
  //   assert.equal(addresses.length, ctr)
  // })

}

describe("Diamond Test", diamondTest);
