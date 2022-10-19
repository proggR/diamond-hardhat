task("loupe-facet-function-selectors", "Calls facetFunctionSelectors function using the Loupe interface")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("facet", "The facet to fetch selectors for ")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("DiamondLoupeFacet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)

    const tx = await facet.facetFunctionSelectors(taskArgs.facet)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
