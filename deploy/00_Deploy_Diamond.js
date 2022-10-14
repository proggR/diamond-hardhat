/* global ethers */
/* eslint prefer-const: "off" */

const { deployDiamond } = require('../lib/diamond/deploy.ts')


module.exports = async ({ getNamedAccounts, deployments }) => {
    await deployDiamond()
}
