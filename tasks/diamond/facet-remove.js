const  diamondLib  = require('../../lib/diamond/diamond.ts')
const  facetLib  = require('../../lib/diamond/facet.ts')

task("facet-remove", "Removes a facet from a diamond")
  .addParam("diamond", "The address of the Diamond contract that you want to add a Facet to")
  .addParam("name", "The contract name Facet contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.diamond
    const networkId = network.name

    const facets = [taskArgs.name]
    await facetLib.removeFacets(contractAddr,facets);
    console.log("Finished cut")

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
