task("storage-app-msg-clone", "Gets the current msg1 value from app storage")
  .addParam("diamond", "The contract name Diamond contract that you want to add to the Diamond (will improve to not need)")
  .setAction(async (taskArgs, hre) => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const Facet = await ethers.getContractFactory("PersistentFacet2")
    const facet = new ethers.Contract(taskArgs.diamond,Facet.interface, signer)

    console.log("RESPONSE: ",await facet.l1())
  }
)

module.exports = {}
