const diamondLib  = require('../../lib/diamond/diamond.ts')
const facetLib  = require('../../lib/diamond/facet.ts')

task("cut-add", "Adds a facet to a diamond")
  .addParam("diamond", "The address of the Diamond contract that you want to add a Facet to")
  .addParam("facet", "The address of the Facet contract that you want to add to the Diamond")
  .addParam("name", "The contract name Facet contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.diamond
    const networkId = network.name

    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory(taskArgs.name)
    const facetContract = new ethers.Contract(taskArgs.facet, Facet.interface, signer)
    const facets = [facetContract]

    await facetLib.cutFacets(contractAddr,diamondLib.FacetCutAction.Add,facets);

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
