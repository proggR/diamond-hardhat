task("call-goodbye", "Calls goodbye function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("FarewellFacet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('Farewell Diamond fetched: ', facet.address)

    const tx = await facet.goodbye()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
