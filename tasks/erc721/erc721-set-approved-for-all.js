task("erc721-set-approved-for-all", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("operator", "The account to check approval for")
  .addParam("approved", "The approval status (1 or 0)")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC721")).i.setApprovalForAll(taskArgs.operator,taskArgs.approved)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
