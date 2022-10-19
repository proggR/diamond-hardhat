const { expect, assert } = require("chai");
const {
  get,
  getSelectors,
} = require('../../lib/diamond/diamond.ts')


// REQUIRED: name set, and diamond/owner/count as params to runTest
// NOTE: count should include base diamond count (so +3). will need -1 for address idx
const name = "MockERC20Facet"
let diamond
let owner
let count

const runTest = (dAddress, dOwner,ctr) => {
  diamond = dAddress
  owner = dOwner
  count = ctr
  describe("MockERC20 (DS for standard, AS for app level data) Test",test)
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
    const Facet = await ethers.getContractFactory("MockERC20Facet")
    facet = new ethers.Contract(diamondAddress,Facet.interface, contractOwner)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    addresses = await diamondLoupeFacet.facetAddresses()
  })

  it('Should have a total supply larger than 0', async () => {
    const signers =  await ethers.getSigners();
    const signer = signers[0]
    const tx = await facet.construct()
    const total = await facet.totalSupply()
    expect(total).to.be.greaterThan(0)
  })

  it('Should have total supply when calling balanceOf(signer) and totalSupply()', async () => {
    const signers =  await ethers.getSigners();
    const signer = signers[0]
    const balance = await facet.balanceOf(signer.address)
    const total = await facet.totalSupply()
    expect(balance).to.be.equal(total)
  })

}

const mockerc20 = () => {
}

exports.name = name
exports.runTest = runTest
module.export = mockerc20
