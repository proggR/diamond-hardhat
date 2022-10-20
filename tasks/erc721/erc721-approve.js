task("erc721-approve", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("spender", "The account to approve")
  .addParam("id", "The token ID to approve")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("MockERC721Facet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('MockERC721 interface fetched:', facet.address)

    const tx = await facet.approve(taskArgs.spender, tarskArgs.id)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
