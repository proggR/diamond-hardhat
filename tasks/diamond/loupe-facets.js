task("loupe-facets", "Calls facets function using the Loupe interface")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const tx = await (await Facet(hre, A(taskArgs.diamond), "DiamondLoupeFacet")).i.facets()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
