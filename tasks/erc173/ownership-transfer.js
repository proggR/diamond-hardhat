task("ownership-transfer", "Calls transferOwnership function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("to", "The address to transfer ownership to")
  .setAction(async (taskArgs, hre) => {
    const signer = Signer(hre)
    const tx = await (await Facet(hre, A(taskArgs.diamond), "OwnershipFacet")).i.transferOwnership(taskArgs.to)
    console.log("EXPECTED: ",signer.address)
    console.log("RESPONSE: ",tx)

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
