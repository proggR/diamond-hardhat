task("facet-upgrade", "Upgrades a facet on a diamond")
  .addParam("name", "The contract name Facet contract that you want to add to the Diamond (will improve to not need)")
  .addParam("diamond", "address for the diamond to cut to (if cut flag is set)")
  .setAction(async (taskArgs, hre) => {   
    const facets = await Facets(hre, A(taskArgs.diamond),[taskArgs.name],CA.Replace)
    console.log(facets[taskArgs.name].i.address)    

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
