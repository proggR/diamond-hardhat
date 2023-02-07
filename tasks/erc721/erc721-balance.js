task("erc721-balance", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .setAction(async (taskArgs, hre) => {
    const signer = await Signer(hre)
    const tx = await (await Facet(hre, A(taskArgs.diamond), "ERC721")).i.balanceOf(signer.address)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
