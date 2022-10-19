task("loupe-facet-addresses", "Calls facets facetAddresses using the Loupe interface")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("DiamondLoupeFacet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
  
    const tx = await facet.facetAddresses()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
