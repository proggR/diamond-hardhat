task("erc20-transfer", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("to", "The account to transfer to")
  .addParam("amount", "The amount to transfer")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC20")).i.transfer(taskArgs.to, taskArgs.amount)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
