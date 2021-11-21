import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import Web3 from 'web3'

// Import ABI
import SimpleStorage from '../abis/SimpleStorage.json'

// Import CSS
import './App.css'

// Import Components
import Navbar from './Navbar'

function App() {
	// SimpleStorage Contract
	const [simpleStorage, setSimpleStorage] = useState(null)

	// User & Contract Info
	const [account, setAccount] = useState(null)
	const [number, setNumber] = useState(0) // Value of the number in the smart contract
	const [myNumber, setMyNumber] = useState(0) // Value set by the user to change

	// Loading & Error Messages
	const [isLoading, setIsLoading] = useState(true)
	const [message, setMessage] = useState("")

	useEffect(() => {

		// Only call this to connect with user account
		if (!account) {
			console.log('Establishing connection with MetaMask...')
			loadBlockchainData()
		} else {
			// Showcase useEffect being called everytime number updates.
			console.log(number)
		}

	}, [number, account])

	const loadBlockchainData = async () => {

		try {

			// Await user login
			setMessage('Awaiting MetaMask Login...')
			await window.ethereum.enable();

			// Load Web3
			const web3 = new Web3(window.ethereum)

			// Load Account
			const accounts = await web3.eth.getAccounts()
			setAccount(accounts[0])

			// Fetch Network ID
			const networkId = await web3.eth.net.getId()

			// Load SimpleStorage contract
			const simpleStorage = new web3.eth.Contract(SimpleStorage.abi, SimpleStorage.networks[networkId].address)
			setSimpleStorage(simpleStorage)

			// Fetch current value
			let result = await simpleStorage.methods.get().call()
			setNumber(result)

			setMessage("")
			setIsLoading(false)

		}
		catch (error) {
			setMessage('MetaMask not detected, or contract not deployed to current network')
		}

	}

	const setNumberHandler = (e) => {
		e.preventDefault()

		if (myNumber < 0) {
			window.alert('Number cannot be negative')
			return
		}

		if (myNumber === number) {
			window.alert('Number cannot be equal to current value')
			return
		}

		simpleStorage.methods.set(myNumber)
			.send({ from: account })
			.on('transactionHash', () => {
				window.alert('Number Set!')
			})

	}

	const getNumberHandler = async () => {
		let result = await simpleStorage.methods.get().call()
		setNumber(result)
	}

	return (
		<div>

			<Navbar account={account} />

			<main role="main" className="container-fluid text-center">

				{isLoading ? (

					<div>
						<Spinner animation="border" className="mt-4 mb-2" />
						<p>{message}</p>
					</div>

				) : (
					<div className="col-lg-12">

						<div className="row">
							<div className="col">
								<h1 className="my-5">Simple Storage w/ Hooks</h1>
								<p className="number">{number}</p>
							</div>
						</div>

						<div className="row content">
							<div className="col user-controls">

								<button onClick={getNumberHandler}>Get</button>

								<form onSubmit={setNumberHandler}>
									<input type="number" placeholder="Enter a number" onChange={(e) => setMyNumber(e.target.value)} />
									<button type="submit">Set</button>
								</form>

							</div>
						</div>

					</div>
				)}

			</main>

		</div>
	);
}

export default App
