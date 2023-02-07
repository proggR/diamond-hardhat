task("storage-app-msg-set", "Sets the current msg1 value from app storage")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("msg", "The message to set")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "Persistent1")).i.setM1(taskArgs.msg)
    console.log("RESPONSE: ",tx)

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  }
)

module.exports = {}
