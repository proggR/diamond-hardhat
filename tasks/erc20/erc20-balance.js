task("erc20-balance", "Calls balanceOf function")
  .addParam("diamond", "The Diamond contract address you want to call")
  .addOptionalParam("account", "The account you want to check the balance of")
  .setAction(async (taskArgs, hre) => {
    const _signer = await Signer(hre)
    const _account = taskArgs.account ? taskArgs.account : _signer.address
    const _tx = await (await Facet(hre, A(taskArgs.diamond), "ERC20")).i.balanceOf(_account)
    console.log (_tx)
  }
)

module.exports = {}
