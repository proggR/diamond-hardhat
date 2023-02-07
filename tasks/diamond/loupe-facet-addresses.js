task("loupe-facet-addresses", "Calls facets facetAddresses using the Loupe interface")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "DiamondLoupeFacet")).i.facetAddresses()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
