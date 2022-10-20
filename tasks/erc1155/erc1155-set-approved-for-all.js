task("erc1155-set-approved-for-all", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addParam("operator", "The account to check approval for")
  .addParam("approved", "The approval status (1 or 0)")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("MockERC1155Facet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('MockERC1155 interface fetched:', facet.address)

    const tx = await facet.setApprovedForAll(tarskArgs.operator,taskArgs.approved)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
