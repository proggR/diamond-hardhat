task("storage-app-msg-set", "Sets the current msg1 value from app storage")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("msg", "The message to set")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("PersistentFacet1")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)

    let tx = await facet.setM1(taskArgs.msg)
    let rx = tx.wait()
    console.log("RESPONSE: ",rx)

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
