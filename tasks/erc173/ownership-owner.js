task("ownership-owner", "Calls owner function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const signer = Signer(hre)
    const tx = await (await Facet(hre, A(taskArgs.diamond), "OwnershipFacet")).i.owner()
    console.log("EXPECTED: ",signer.address)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
