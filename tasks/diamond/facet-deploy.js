task("facet-deploy", "Adds a facet to a diamond")
  .addParam("name", "The contract name Facet contract that you want to add to the Diamond (will improve to not need)")
  .addOptionalParam("diamond", "address for the diamond to cut to (if cut flag is set)")
  .setAction(async (taskArgs, hre) => {   
    if(taskArgs.diamond > 0){
      const facets = await Facets(hre, A(taskArgs.diamond),[taskArgs.name],CA.Add)
      console.log(facets[taskArgs.name].i.address)
    }else{
      // note: this currently returns an ethers object, will eventually return a Facet object
      // will aim to respect and set the `address` prop, since that's to be standard anyway
      const facet = await(await Facet(hre, false, taskArgs.name)).Deploy()
      console.log(facet.i.address)
    }

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
