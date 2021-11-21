pragma solidity ^0.5.0;

interface Exchange1 {
    function sellTokens(address _token, uint _amount) external returns (uint amount);
}

interface Exchange2 {
    function buyTokens(address _token) external payable returns (uint amount);
}

interface ERC20 {
    function transfer(address _to, uint _value) external returns (bool success);
    function approve(address _spender, uint _value) external returns (bool success);
}

contract SimpleArb {
    // code is to just illustrate examples only e.g sellTokens and buyTokens just dummy functions to illustrate process of buying and selling
    
    address public exchange1 = 0x818E6FECD516Ecc3849DAf6845e3EC868087B755; // KyberNetworkProxy on  Mainnet
    address public exchange2 = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D; // Uniswap V2 Router on Mainnet

    address public token = 0x6B175474E89094C44Da98b954EedeAC495271d0F; // Dai Token on Mainnet

    function arb() internal {
        uint amount = 10000000000000000000; // 100 tokens
        ERC20(token).approve(exchange1, amount); // Approve tokens
        uint ethAmount = Exchange1(exchange1).sellTokens(token, amount); // Sell Tokens for Ether
        Exchange2(exchange1).buyTokens.value(ethAmount)(token); // Sell Tokens for Ether
    }
    
}