task("erc20-approve", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("spender", "The account to transfer to")
  .addParam("amount", "The amount to transfer")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC20")).i.approve(taskArgs.spender, taskArgs.amount)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
