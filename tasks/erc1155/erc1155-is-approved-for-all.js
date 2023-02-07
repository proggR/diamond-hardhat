task("erc1155-is-approved-for-all", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("owner", "The account who approved")
  .addParam("operator", "The account to check approval for")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC1155")).i.isApprovedForAll(taskArgs.owner,taskArgs.operator)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
