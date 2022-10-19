task("ownership-owner", "Calls owner function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("OwnershipFacet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('IERC173 interface fetched:', facet.address)

    const tx = await facet.owner()
    console.log("EXPECTED: ",signer.address)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
