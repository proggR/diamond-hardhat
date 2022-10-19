task("support-interface", "Calls owner function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("iface", "The interface to test support for")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("IERC165")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('IERC165 interface fetched:', facet.address)

    const tx = await facet.supportsInterface(taskArgs.iface)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
