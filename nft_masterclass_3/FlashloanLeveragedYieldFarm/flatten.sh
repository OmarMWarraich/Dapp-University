#!/usr/bin/env bash
rm -rf src/flats/*
./node_modules/.bin/truffle-flattener src/contracts/FlashLoanTemplate.sol > flats/FlashLoanTemplate_flat.sol
./node_modules/.bin/truffle-flattener src/contracts/LeveragedYieldFarm.sol > flats/LeveragedYieldFarm_flat.sol
