task("erc1155-total-supply", "Calls totalSupply function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("id", "The token id to check")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC1155")).i.totalSupply(taskArgs.id)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
