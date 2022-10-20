task("erc721-is-approved-for-all", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("owner", "The account who approved")
  .addParam("operator", "The account to check approval for")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("MockERC721Facet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('MockERC721 interface fetched:', facet.address)

    const tx = await facet.isApprovedForAll(tarskArgs.owner,tarskArgs.operator)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
