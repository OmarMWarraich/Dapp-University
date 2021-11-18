const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const ether = n => (n*10**18).toString()

console.log("Testing on OVM")

const NFT = artifacts.require('./NFT')
const Token = artifacts.require('./Token')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('NFT', ([acc1,acc2]) => {
  let nft
  let token 

  beforeEach(async () => {
    token = await Token.new({ from: acc1, gasPrice: 0 })
    nft = await NFT.new(token.address,{ gasPrice: 0 })
    // give acc2 some ONC tokens from account1
    await token.transfer(acc2, ether(100), { from: acc1 , gasPrice: 0})
  })

  describe('deploy and test...', () => {
    it('...name', async () => {
      expect(await nft.name()).to.be.eq('Dapp University')
    })

    it('...symbol', async () => {
      expect(await nft.symbol()).to.be.eq('DAPPU')
    })

    it('...owner address', async () => {
      expect(await nft._owner()).to.be.eq(acc1)
    })
  })
  
  describe('deploy, mint and test...', () => {

    beforeEach(async () => {
      await nft.mint('token_uri_1', ether(0.01),{from:acc1, gasPrice: 0})
      await nft.mint('token_uri_2', ether(0.02),{from:acc1, gasPrice: 0})
      await nft.mint('token_uri_3', ether(0.03),{from:acc1, gasPrice: 0})
    })

    it('...total supply', async () => {
      expect(Number(await nft.totalSupply())).to.be.eq(3)
    })

    it("...URI's", async () => {
      expect(await nft.tokenURI('1')).to.be.eq('token_uri_1')
      expect(await nft.tokenURI('2')).to.be.eq('token_uri_2')
      expect(await nft.tokenURI('3')).to.be.eq('token_uri_3')
    })

    it("...prices", async () => {
      expect(Number(await nft.price('1'))).to.be.eq(Number(ether(0.01)))
      expect(Number(await nft.price('2'))).to.be.eq(Number(ether(0.02)))
      expect(Number(await nft.price('3'))).to.be.eq(Number(ether(0.03)))
    })

    it("+ test if rejects minting by non-owner", async () => {
      await nft.mint('token_uri_4', ether(0.04), { from: acc2, gasPrice:0 }).should.be.rejected
    })
  }) 

  describe('deploy, mint, buy and test...', () => {
    let res

    beforeEach(async () => {
      await nft.mint('token_uri_1', ether(0.01),{from:acc1, gasPrice: 0})
      await nft.mint('token_uri_2', ether(0.01),{from:acc1, gasPrice: 0})
      await token.approve(nft.address, ether(0.01), {from:acc1, gasPrice: 0}) //aprove first 
      res = await nft.buy('1', ether(0.01), {from: acc1, gasPrice:0})
    })
  
    it('...new owner', async () => {
      expect(await nft.ownerOf('1')).to.be.eq(acc1)
    })

    it("...sold status", async () => {
      expect(await nft.sold('1')).to.eq(true)
    })

    it("...event values", () => {
      expectEvent.inLogs(res.logs, 'Purchase', {
        owner: acc1,
        price: ether(0.01),
        id: '1',
        uri: 'token_uri_1'
      })
    })
    it("+ test if rejects buying for invalid id, msg.value and status", async () => {
      expectRevert(nft.buy('3', ether(0.01), {from: acc2, gasPrice: 0}), "Error, wrong Token id")
      expectRevert(nft.buy('2', ether(0.01), {from: acc2, gasPrice: 0}), "Error, Token costs more")
      expectRevert(nft.buy('1', ether(0.01), {from: acc2, gasPrice: 0}), "Error, Token is sold")
    })
  
  })

})