import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import { ethers } from "ethers";
import { formatEther, formatUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts';
import {
	useEthers, useTokenBalance, useEtherBalance, useContractCall, useContractFunction, useNotifications
} from '@usedapp/core'

// Import ABI
import SimpleStorage from '../abis/SimpleStorage.json'

// Import CSS
import './App.css'

// Import Components
import Navbar from './Navbar';

function App() {
	const [myNumber, setMyNumber] = useState(0) // Value set by the user to change
	const DAI = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa' // DAI Address on Kovan

	// useEthers, useEtherBalance, useTokenBalance hooks
	const { account, chainId } = useEthers()
	const etherBalance = useEtherBalance(account)
	const daiBalance = useTokenBalance(DAI, account)

	// useNotifications
	const { notifications } = useNotifications()

	// SimpleStorage Contract
	let networkId, simpleStorage, simpleStorageCall

	try {
		// Because Ganache uses ID 5777, if we are connected to localhost, use that instead of 1337.
		chainId === 1337 ? networkId = 5777 : networkId = chainId

		// simpleStorage contract will be passed into useContractFunction
		simpleStorage = new Contract(
			SimpleStorage.networks[networkId].address,
			SimpleStorage.abi
		)

		// simpleStorageCall will be passed into useContractCall
		simpleStorageCall = {
			abi: new ethers.utils.Interface(SimpleStorage.abi),
			address: SimpleStorage.networks[networkId].address,
			method: "get",
			args: []
		}
	} catch (error) {
		console.log(`Contract not deployed to current network`)
	}

	// useContractFunction -- This hook allows us to interact with contract functions, in this case, setting the number
	const { send } = useContractFunction(simpleStorage, 'set', { transactionName: 'Set' })
	const setNumberHandler = (e) => {
		e.preventDefault()

		if (myNumber < 0) {
			window.alert('Number cannot be negative')
			return
		}

		if (myNumber === Number(number)) {
			window.alert('Number cannot be equal to current value')
			return
		}

		send(myNumber)
	}

	// useContractCall -- This hook allows us to make calls to the contract, in this case, to retrieve the stored number,
	const number = useContractCall(simpleStorageCall)

	return (
		<div>

			<Navbar />

			<main role="main" className="container-fluid text-center">
				<h1 className="title">Simple Storage w/ useDApp</h1>

				{/* If we are not logged in, OR the chainId does not equal 1337 AND it does not equal 42, then show spinner. */}
				{!account || (chainId !== 1337 && chainId !== 42) ? (
					<div>
						<Spinner animation="border" className="mt-4 mb-2" />
					</div>
				) : (
					<div className="col-lg-12">

						{/* SHOW NUMBER */}
						<div className="row">
							<div className="col">
								<p className="number">{number && Number(number)}</p>
							</div>
						</div>

						{/* SET NUMBER FORM */}
						<div className="row content">
							<div className="col user-controls">
								<form onSubmit={setNumberHandler}>
									<input type="number" placeholder="Enter a number" onChange={(e) => setMyNumber(e.target.value)} />
									<Button type="submit">Set</Button>
								</form>
							</div>
						</div>

						{/* DISPLAY USER BALANCES */}
						<div className="row">
							<h2 className="my-2">My Account</h2>
							{etherBalance && <p className="my-2">Ether Balance: {formatEther(etherBalance)}</p>}
							{daiBalance && <p className="my-2">DAI Balance: {formatUnits(daiBalance)}</p>}
						</div>

						{/* SHOW NOTIFICATIONS */}
						{notifications.length !== 0 && notifications[0].type !== 'walletConnected' && (
							<div className="row content">
								<table className="my-3">
									<thead>
										<tr>
											<th>Type</th>
											<th>Name</th>
											<th>Hash</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{notifications[0].type}</td>
											<td>{notifications[0].transactionName}</td>
											<td>{notifications[0].transaction.hash}</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
				)}
			</main>
		</div>
	);
}

export default App
