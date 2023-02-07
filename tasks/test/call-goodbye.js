task("call-goodbye", "Calls goodbye function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "Farewell")).i.goodbye()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
