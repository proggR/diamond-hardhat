task("erc20-name", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("MockERC20Facet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('MockERC20 interface fetched:', facet.address)

    const tx = await facet.name()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
