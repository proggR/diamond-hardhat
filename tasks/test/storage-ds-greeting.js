task("storage-ds-greeting", "Gets the current greeting value from diamond storage")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "Persistent2")).i.getDS()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
