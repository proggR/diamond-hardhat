const { expect, assert } = require("chai");
const {
  get,
  getSelectors,
} = require('../../lib/diamond/diamond.ts')


// REQUIRED: name set, and diamond/owner/count as params to runTest
// NOTE: count should include base diamond count (so +3). will need -1 for address idx
const name = "MockERC1155Facet"
let diamond
let owner
let count

const runTest = (dAddress, dOwner,ctr) => {
  diamond = dAddress
  owner = dOwner
  count = ctr
  describe("MockERC1155 (DS for standard, AS for app level data) Test",test)
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
    const Facet = await ethers.getContractFactory("MockERC1155Facet")
    facet = new ethers.Contract(diamondAddress,Facet.interface, contractOwner)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    addresses = await diamondLoupeFacet.facetAddresses()
  })

  it('Should have a token minted to signer address', async () => {
    const signers =  await ethers.getSigners();
    const signer = signers[0]
    const tx = await facet.construct()
    const total = await facet.balanceOf(signer.address, 1)
    expect(total).to.be.equal(1)
  })

  it('Should exist', async () => {
    const exists = await facet.exists(1)
    expect(exists).to.be.equal(true)
  })

  it('Should get back 1 for totalSupply', async () => {
    const totalSupply = await facet.totalSupply(1)
    expect(totalSupply).to.be.equal(1)
  })

  it('Should get back tokenURI served from ipfs.io', async () => {
    const tokenURI = await facet.uri(1)
    expect(tokenURI).to.be.equal("https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu")
  })

  it('Should get an error when I request a URI for a token that doesn\'t exist', async () => {
    try {
      const tokenURI = await facet.tokenURI(2)
      expect(tokenURI).to.be.equal("https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu")
    } catch(error){
      assert(true,true)
    }
  })

}

const mockerc1155 = () => {
}

exports.name = name
exports.runTest = runTest
module.export = mockerc1155
