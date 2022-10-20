task("erc1155-total-supply", "Calls totalSupply function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("id", "The token id to check")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("MockERC1155Facet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('MockERC1155 interface fetched:', facet.address)

    const tx = await facet.totalSupply(taskArgs.id)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
