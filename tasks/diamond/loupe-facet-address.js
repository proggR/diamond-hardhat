task("loupe-facet-address", "Calls facets facetAddresses using the Loupe interface")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("func", "The function selector you want the address for")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "DiamondLoupeFacet")).i.facetAddress(taskArgs.func)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
