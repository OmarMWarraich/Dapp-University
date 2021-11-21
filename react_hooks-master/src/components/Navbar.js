import logo from '../logo.png'

const Navbar = ({ account }) => {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={logo} className="App-logo" alt="logo" />
                Simple Storage w/ Hooks
            </a>

            {account && (
                <a
                    className="nav-link small mx-3"
                    href={`https://etherscan.io/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {account}
                </a>
            )}
        </nav>
    );
}

export default Navbar;