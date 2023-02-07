task("erc721-approve", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("spender", "The account to approve")
  .addParam("id", "The token ID to approve")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC721")).i.approve(taskArgs.spender, taskArgs.id)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
