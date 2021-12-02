const DappUniversityToken = artifacts.require("./DappUniversityToken.sol");

module.exports = async (callback) => {
  try {
    const contract = await DappUniversityToken.deployed()
    const tokenURI = process.env.TOKEN_URI

    // Token Holder accounts
    const accounts = [
      // Accounts go here...
    ]

    for (const account of accounts) {
      try {
        console.log("=================================================")
        console.log("MINTING TOKEN:\n")
        console.log(account)
        console.log(tokenURI)
        console.log("\n")

        const result = await contract.mint(
          account,
          tokenURI
        )

        console.log(`SUCCESS:\n`)
        console.log(`https://etherscan.io/tx/${result.tx}`)
        console.log("\n\n")
      }
      catch(error) {
        console.log(error)
      }
    }
  }
  catch(error) {
    console.log(error)
  }

  callback()
}
