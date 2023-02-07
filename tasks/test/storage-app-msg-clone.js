task("storage-app-msg-clone", "Gets the current msg1 value from app storage")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "Persistent2")).i.l1()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
