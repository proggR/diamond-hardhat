task("erc20-transfer-from", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("from", "The account to transfer from")
  .addParam("to", "The account to transfer to")
  .addParam("amount", "The amount to transfer")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC20")).i.transferFrom(taskArgs.from, taskArgs.to, taskArgs.amount)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
