task("support-interface", "Calls owner function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("iface", "The interface to test support for")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "IERC165")).i.supportsInterface(taskArgs.iface)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
