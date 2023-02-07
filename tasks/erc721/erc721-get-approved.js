task("erc721-get-approved", "Calls getApproved function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("id", "The token ID to approve")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC721")).i.getApproved(taskArgs.id)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
