task("erc721-total-supply", "Calls totalSupply function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC721")).i.totalSupply()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
