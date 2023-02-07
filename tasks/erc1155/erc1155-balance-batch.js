task("erc1155-balance-batch", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("id", "The token id to check")
  .setAction(async (taskArgs, hre) => {
    const signer = await Signer(hre)
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC1155")).i.balanceOfBatch([signer.address], [taskArgs.id])
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
