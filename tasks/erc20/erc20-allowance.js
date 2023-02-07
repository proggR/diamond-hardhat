task("erc20-allowance", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("owner", "The account who owns the asset")
  .addParam("spender", "The account with an allowance")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC20")).i.allowance(taskArgs.owner, taskArgs.spender)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
