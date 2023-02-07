/* eslint prefer-const: "off" */
module.exports = async ({ getNamedAccounts, deployments }) => {
    // console.log(hre)
    const _signer = await Signer(hre)

    // Deploys the ERC20 token diamond + facet
    // Deploys to 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 on HH net
    const token = await Diamond(hre, 'Diamond')        
    const tokenFacets = await Facets(hre, token,
                                            [
                                                "ERC20"
                                            ],
                                            CA.Add
                                        )
                                                                                
    await tokenFacets.ERC20.instance.construct("Test Token", "TEST", 
                                        18,
                                        hre.ethers.utils.parseEther("100000000000"), 
                                        _signer.address
                                    )

    // Deploys the ERC721 diamond + facet 
    // Deploys to 0x610178dA211FEF7D417bC0e6FeD39F05609AD788 on HH net
    const nft = await Diamond(hre, 'Diamond') 
    const nftFacets = await Facets(hre, nft,
                                            [
                                                "ERC721"
                                            ],
                                            CA.Add
                                        )                                     
    
    await nftFacets.ERC721.instance.construct("Test Token", "TEST", 
                                        "Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",                                        
                                    )

    // Deploys the ERC1155 diamond + facet 
    // Deploys to 0x3Aa5ebB10DC797CAC828524e59A333d0A371443c on HH net
    const elflifty = await Diamond(hre, 'Diamond')
    const elfliftyFacets = await Facets(hre, elflifty,
                                            [
                                                "ERC1155"
                                            ],
                                            CA.Add
                                        )                                     

    await elfliftyFacets.ERC1155.instance.construct("https://ipfs.io/ipfs/", 
                        "Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu")
}