task("loupe-facet-function-selectors", "Calls facetFunctionSelectors function using the Loupe interface")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .addParam("facet", "The facet to fetch selectors for ")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "DiamondLoupeFacet")).i.facetFunctionSelectors(taskArgs.facet)
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
