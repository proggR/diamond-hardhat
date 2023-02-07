task("call-hello", "Calls greeter function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "Greeter")).i.hello()
    console.log("RESPONSE: ",tx)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
