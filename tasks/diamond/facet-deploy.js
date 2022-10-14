task("facet-deploy", "Adds a facet to a diamond")
  .addParam("name", "The contract name Facet contract that you want to add to the Diamond (will improve to not need)")
  .addOptionalParam("diamond", "address for the diamond to cut to (if cut flag is set)")
  .setAction(async (taskArgs, hre) => {
    const name = taskArgs.name
    console.log(taskArgs.diamond);

    const Facet = await ethers.getContractFactory(name)
    const facet = await Facet.deploy()
    await facet.deployed()
    console.log(name, ' Facet deployed:', facet.address)

    if(taskArgs.diamond > 0){
      console.log('Cutting to diamond',taskArgs.diamond)
      await hre.run('cut-add',{'diamond':taskArgs.diamond,'facet':facet.address,'name':name})
    }

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  })

module.exports = {}
