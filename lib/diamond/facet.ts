const { get, getSelector, getSelectors, FacetCutAction } = require('./diamond.ts')

const zeroAddress = '0x0000000000000000000000000000000000000000'
const _gasLimit = 10000000

const deployFacets = async (diamondAddress, CutAction, FacetNames) =>  {
  const accounts = await ethers.getSigners()
  const facets = []
  for (const FacetName of FacetNames) {
    console.log(FacetName)
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = await Facet.deploy()
    await facet.deployed();
    facets.push(facet);
  }
  return cutFacets(diamondAddress,CutAction,facets)
}

const removeFacets = async (diamondAddress, FacetNames) =>  {
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]
  let facets = []
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = new ethers.Contract(zeroAddress,Facet.interface,contractOwner)
    facets.push(facet);
  }
  return cutFacets(diamondAddress,2,facets)
}

const cutFacets = async (diamondAddress, CutAction, facets) =>  {
  const accounts = await ethers.getSigners()
  let cut = []
  for (const facet of facets) {
      cut.push({
      facetAddress: facet.address,
      action: CutAction,
      functionSelectors: getSelectors(facet)
    });
  }

  const diamondCut = await ethers.getContractAt('IDiamondCut', diamondAddress)

  let tx
  let receipt

  let functionCall = ethers.utils.formatBytes32String("");

  tx = await diamondCut.diamondCut(cut, zeroAddress, functionCall,{
    gasLimit: _gasLimit
  })
  receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }

  return facets;
}

exports.deployFacets = deployFacets
exports.cutFacets = cutFacets
exports.removeFacets = removeFacets

const facetLib = () => {}

module.export = facetLib
