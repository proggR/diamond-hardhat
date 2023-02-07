task("erc721-owner", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("id", "Token ID to check")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC721")).i.ownerOf(taskArgs.id)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
