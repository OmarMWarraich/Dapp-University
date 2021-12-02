#!/usr/bin/env bash
rm -rf src/flats/*
./node_modules/.bin/truffle-flattener contracts/DappUniversityToken.sol > flats/DappUniversityToken_flat.sol
