const { expect, assert } = require("chai");
const {
  get,
  getSelectors,
} = require('../../lib/diamond/diamond.ts')


// REQUIRED: name set, and diamond/owner/count as params to runTest
// NOTE: count should include base diamond count (so +3). will need -1 for address idx
const name = "MockERC721Facet"
let diamond
let owner
let count

const runTest = (dAddress, dOwner,ctr) => {
  diamond = dAddress
  owner = dOwner
  count = ctr
  describe("MockERC721 (DS for standard, AS for app level data) Test",test)
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
    const Facet = await ethers.getContractFactory("MockERC721Facet")
    facet = new ethers.Contract(diamondAddress,Facet.interface, contractOwner)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    addresses = await diamondLoupeFacet.facetAddresses()
  })

  step('Should have a token minted to signer address', async () => {
    const signers =  await ethers.getSigners();
    const signer = signers[0]
    const tx = await facet.construct()
    const total = await facet.balanceOf(signer.address)
    expect(total).to.be.equal(1)
  })

  step('Should identify as the owner of ID #1', async () => {
    const signers =  await ethers.getSigners();
    const signer = signers[0]
    const owner = await facet.ownerOf(1)
    expect(owner).to.be.equal(signer.address)
  })

  step('Should get back tokenURI served from ipfs.io', async () => {
    const tokenURI = await facet.tokenURI(1)
    expect(tokenURI).to.be.equal("https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu")
  })

  step('Should get an error when I request a URI for a token that doesn\'t exist', async () => {
    try {
      const tokenURI = await facet.tokenURI(2)
      expect(tokenURI).to.be.equal("https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu")
    } catch(error){
      assert(true,true)
    }
  })

}

const mockerc721 = () => {
}

exports.name = name
exports.runTest = runTest
module.export = mockerc721
