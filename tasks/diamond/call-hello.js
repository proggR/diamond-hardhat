task("call-hello", "Calls greeter function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("GreeterFacet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)

    const tx = await facet.hello()
    console.log("RESPONSE: ",tx)
  }
)

module.exports = {}
