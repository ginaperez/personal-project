import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import './index.css';
import './App.scss';
import * as serviceWorker from './serviceWorker';

import { Switch, NavLink, Link, Route, withRouter } from 'react-router-dom';

import axios from 'axios';

import logo from '../src/logo.jpg';

// import AuthComponent from './components/old/AuthComponent.js';
// import CartComponent from './components/old/CartComponent.js';
// import InventoryComponent from './components/old/InventoryComponent.js';
// import LoginComponent from './components/old/LoginComponent.js';
// import ProfileComponent from './components/old/ProfileComponent.js';
// import RegisterComponent from './components/old/RegisterComponent.js';
// import SearchComponent from './components/old/SearchComponent.js';

const store = createStore(reducer);

const API = {
	login: '/api/login',
	register: '/api/register',
	session: '/api/session',
	logout: '/api/logout',
	inventory: '/api/inventory',
	search: '/api/search',
	orders: '/api/orders',
	purchaseHistory: '/api/purchaseHistory',
	cart: '/api/cart'
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// auth
			registerEmail: "",
			registerPassword: "",
			loginEmail: "",
			loginPassword: "",
			session: {
				email: "",
				user_id: null
			},

			// inventory
			inventory: [],

			// search
			searchQuery: "",

			// purchase history
			purchaseHistory: [],

			// cart
			cart: []
		};

		// auth
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);

		// inventory
		this.getInventory = this.getInventory.bind(this);
		this.addToCart = this.addToCart.bind(this);

		// search
		this.searchInventory = this.searchInventory.bind(this);

		// purchase history
		this.getPurchaseHistory = this.getPurchaseHistory.bind(this);

		// cart
		this.getCart = this.getCart.bind(this);
	}

	componentDidMount() {
		this.getInventory();
	}

	// login functions
	async register() {
		const { registerEmail, registerPassword } = this.state;
		const session = await axios.post(API.register, {
			email: registerEmail,
			password: registerPassword
		});
		this.setState({ session: session.data });
	}
	async login() {
		const { loginEmail, loginPassword } = this.state;
		const session = await axios.post(API.login, {
			email: loginEmail,
			password: loginPassword
		});
		// TODO: check for success/fail login
		// TODO: clear out the register text boxes
		this.setState({ session: session.data })
	}

	async logout() {
		const { session } = this.state;
		const destroyedSession = await axios.post(API.logout, {});

		this.setState({ session: { email: "", user_id: null } });
	}

	async getSession() {
		const session = await axios.get(API.session);

		// TODO: clear out the login text boxes
		this.setState({ session: session.data })
	}

	// inventory functions
	async getInventory() {
		const inventoryResponse = await axios.get(API.inventory);

		this.setState({ inventory: inventoryResponse.data })
	}

	async searchInventory() {
		const { searchQuery } = this.state;
		const inventoryResponse = await axios.get(`${API.search}?query=${searchQuery}`);

		this.setState({ inventory: inventoryResponse.data })
	}

	// TODO: Finish this! Add a cart to your state and add the id to it
	addToCart(id) {
		console.log(id);
	}

	// purchase history
	async getPurchaseHistory() {
		const { purchaseHistory } = this.state;
		const purchaseHistoryResponse = await axios.get(`${API.purchaseHistory}`);

		this.setState({ purchaseHistory: purchaseHistoryResponse.data });
	}


	// cart functions

	async getCart() {
		const { cart } = this.state;
		const cartResponse = await axios.get(API.cart);

		this.setState({ cart: cartResponse.data });
	}


	render() {
		const { registerEmail, registerPassword, loginEmail, loginPassword, session, inventory, searchQuery } = this.state;
		return (
			<div className="app">
				<header className="header-class">
					<div className="header-left-corner">
						<div className="search-area">
							<form onSubmit={e => { e.preventDefault(); this.searchInventory(); }}>
								<label>Search:</label>
								<input value={searchQuery} onChange={(e) => { this.setState({ searchQuery: e.target.value }); }} />
								<button>Search</button>
							</form>
						</div>
						{
							//<Link to="/search" className="search"></Link>
							// <SearchComponent />
						}
					</div>
					<div className='logo-links-flex'>
						<div className='logo'>
							<img src={logo} alt='logo' />
						</div>
						<nav className='navlinks'>
							<NavLink activeClassName="active" exact to="/inventory">Products</NavLink>
							<NavLink activeClassName="active" exact to="/my_orders">My Orders</NavLink>
						</nav>
					</div>
					<div className='header-right-corner'>
						{ session.user_id && ( <div className="">{`Logged in as ${session.email}`} <button onClick={() => this.logout()}>Log Out</button></div> )}
						{ !session.user_id && <Link to="/login" className="login"><button>Login</button></Link> }
						{
							// session.user_id && ({`Logged in as ${session.email}`}<button>Log Out</button> )
						}
					</div>
				</header>
				<div className="main-area">
					<div className='auth-container'>
						<form onSubmit={e => { e.preventDefault(); this.login(); }}>
							<div className='login-input-container'>
								<label>Email: </label>
								<input type="email" value={loginEmail} onChange={(e) => this.setState({ loginEmail: e.target.value })} />
							</div>
							<div className='login-input-container'>
								<label>Password: </label>
								<input type="password" value={loginPassword} onChange={(e) => this.setState({ loginPassword: e.target.value })} />
							</div>
							<button>Login</button>
						</form>
						<form onSubmit={e => { e.preventDefault(); this.register(); }}>
							<div className="register-input-container">
								<label>Email: </label>
								<input type="email" value={registerEmail} onChange={(e) => this.setState({ registerEmail: e.target.value })} />
							</div>
							<div className="register-input-container">
								<label>Password: </label>
								<input type="password" value={registerPassword} onChange={(e) => this.setState({ registerPassword: e.target.value })} />
							</div>
							<button>Register</button>
						</form>
					</div>
					<div className="purchase-history">
						<div className="">
							<button className="wide-element" onClick={() => this.getPurchaseHistory()}>Get Purchase History</button>
						</div>
						{
							this.state.purchaseHistory.map((purchaseHistoryItem, i) => {
								return (
									<div className="">
										<p>Purchase ID: {purchaseHistoryItem.purchase_id}</p>
										<p>Purchase date: {purchaseHistoryItem.purchase_date}</p>
										<p>User ID: {purchaseHistoryItem.user_id}</p>
										<p>Item ID: {purchaseHistoryItem.item_id}</p>
										<p>Item Name: {purchaseHistoryItem.item_name}</p>
										<p>Item Qty: {purchaseHistoryItem.item_qty}</p>
										<p>Item Unit Price: {purchaseHistoryItem.item_unit_price}</p>
										<p>Item Total Price: {purchaseHistoryItem.total_price}</p>
										<p>Item Image URL: {purchaseHistoryItem.image}</p>
									</div>
								)
							})
						}
					</div>
					<div className="cart-view">
						<div className="">
							<button className="wide-element" onClick={() => this.getCart()}>Get Cart</button>
						</div>
						{
							this.state.cart.map((cartItem, i) => {
								return (
									<div className="">
										<p>User ID: {cartItem.user_id}</p>
										<p>Item ID: {cartItem.item_id}</p>
										<p>Item Name: {cartItem.item_name}</p>
										<p>Item Qty: {cartItem.item_qty}</p>
										<p>Item Unit Price: {cartItem.item_unit_price}</p>
										<p>Item Total Price: {cartItem.total_price}</p>
										<p>Item Image URL: {cartItem.image}</p>
									</div>
								)
							})
						}
					</div>
					<div className="inventory-grid">
						{
							this.state.inventory.map((inventoryItem, i) => {
								return (
									<div className="inventory-child" key={i}>
										<div className="inventory-child-spacer">
											<img alt={'Inventory item ' + inventoryItem.item_name} src={inventoryItem.image} width="200px" />
										</div>
										<div className="inventory-child-spacer">
											<h2>{inventoryItem.item_name}</h2>
										</div>
										<div className="wide-element inventory-child-spacer">
											<button className="wide-element" onClick={() => this.addToCart(inventoryItem.item_id)}>Add To Cart</button>
										</div>
									</div>
								)
							})
						}
					</div>
					{
						// show inventory
						// <Switch>
						// 	<Route exact path="/login" component={AuthComponent} />
						// 	<Route exact path="/my_orders" component={ProfileComponent} />
						// 	<Route exact path="/inventory" component={InventoryComponent} />
						// </Switch>
					}
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// <div id='app' className=''>
// 	<Switch>
// 		<Route component={Login} path="/" exact />
// 		<Route component={Shop} path="/shop" />
// 		<Route component={Checkout} path="/checkout" />
// 	</Switch>
// </div>