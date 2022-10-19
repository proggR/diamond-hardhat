task("facet-upgrade", "Upgrades a facet on a diamond")
  .addParam("name", "The contract name Facet contract that you want to add to the Diamond (will improve to not need)")
  .addParam("diamond", "address for the diamond to cut to (if cut flag is set)")
  .setAction(async (taskArgs, hre) => {
    const name = taskArgs.name
    const Facet = await ethers.getContractFactory(name)
    const facet = await Facet.deploy()
    await facet.deployed()

    if(taskArgs.diamond > 0){
      console.log('Cutting to diamond',taskArgs.diamond)
      await hre.run('cut-replace',{'diamond':taskArgs.diamond,'facet':facet.address,'name':name})
    }else if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
