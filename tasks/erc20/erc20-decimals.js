task("erc20-decimals", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC20")).i.decimals()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
