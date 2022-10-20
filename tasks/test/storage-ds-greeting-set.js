task("storage-ds-greeting-set", "Gets the current greeting value from diamond storage")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("greeting", "The greeting to set")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("PersistentFacet2")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)

    let tx = await facet.setDS(taskArgs.greeting)
    let rx = await tx.wait()

    console.log("RESPONSE: ",rx)

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
