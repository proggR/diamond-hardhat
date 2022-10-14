task("call-hello", "Calls greeter function")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("GreeterFacet")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)
    console.log('Greeter Diamond fetched:', facet.address)

    const tx = await facet.hello()
    console.log("RESPONSE: ",tx)

    if (["hardhat", "localhost", "ganache"].indexOf(network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  })

module.exports = {}
