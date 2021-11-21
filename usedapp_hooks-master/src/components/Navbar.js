import { Button } from 'react-bootstrap';
import logo from '../logo.png'

import { useEthers } from '@usedapp/core'

const Navbar = () => {
    const { activateBrowserWallet, account } = useEthers()

    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={logo} className="App-logo" alt="logo" />
                Dapp University
            </a>

            {account ? (
                <a
                    className="nav-link small mx-3"
                    href={`https://etherscan.io/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {account}
                </a>
            ) : (
                <Button onClick={() => activateBrowserWallet()}>Connect</Button>
            )}
        </nav>
    );
}

export default Navbar;