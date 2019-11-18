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
	cart: '/api/cart',
	checkout: '/api/checkout'
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
		this.modifyCart = this.modifyCart.bind(this);

		// search
		this.searchInventory = this.searchInventory.bind(this);

		// purchase history
		this.getPurchaseHistory = this.getPurchaseHistory.bind(this);

		// cart
		this.getCart = this.getCart.bind(this);

		// checkout
		this.checkout = this.checkout.bind(this);

		// ui-related
		this.updateItemAddToCartQty = this.updateItemAddToCartQty.bind(this);
		this.updateCartItemQty = this.updateCartItemQty.bind(this);
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

		const inventoryWithInitializedCartQty = inventoryResponse.data.map((inventoryItem) => {
			inventoryItem.cartQty = 1;
			return inventoryItem;
		});

		this.setState({ inventory: inventoryWithInitializedCartQty })
	}

	async searchInventory() {
		const { searchQuery } = this.state;
		const inventoryResponse = await axios.get(`${API.search}?query=${searchQuery}`);

		this.setState({ inventory: inventoryResponse.data })
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

		const cartWithInitializedCartQty = cartResponse.data.map((cartItem) => {
			cartItem.cartQty = cartItem.item_qty;
			return cartItem;
		});

		this.setState({ cart: cartWithInitializedCartQty });
	}

	// modifyCart will ADD itemQty to the cart, or it will insert the new
	// itemId into the cart w/ itemQty if it is not in the cart yet
	async modifyCart(itemId, itemQty) {
		if (itemQty === 0) {
			const cartResponse = await axios.delete(`${API.cart}/${itemId}`);
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		} else {
			const cartResponse = await axios.put(API.cart, {
				itemId: itemId,
				itemQty: itemQty
			});
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		}
		this.getCart();
	}

	// updateItemQtyInCart will SET the itemQty for the given itemId in the cart
	// This is different from modifyCart in that it only works on existing cart itemsx
	async updateItemQtyInCart(itemId, itemQty) {
		if (itemQty === 0) {
			const cartResponse = await axios.delete(`${API.cart}/${itemId}`);
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		} else {
			console.log(itemId, itemQty);
			// technically, axios.patch() should be used here, but axios doesn't seem to work
			// with patch(url, body) for some reason
			const cartResponse = await axios.put(API.cart, {
				itemId: itemId,
				itemQty: itemQty
			});
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		}
		this.getCart();
	}

	async clearCart() {
		const freshCart = await axios.delete(API.cart);

		this.setState({ cart: freshCart.data });
		this.getCart();
	}

	// checkout function
	async checkout() {
		const freshCart = await axios.post(API.checkout);

		this.setState({ cart: freshCart.data });
		this.getPurchaseHistory();
		this.getCart();
	}

	// ui function for modifying each item's "add to cart" quantity
	// I noticed tht if I just bind the input text box "value" property directly
	// to an inventory item and then use the event callback to update that value
	// directly, react doesn't always seem to like it? using <form> html tags also fixed it
	updateItemAddToCartQty(itemId, itemQty) {
		// inventory has to be a var instead of a const
		// because inventory.map() doesn't work with a const
		var { inventory } = this.state;

		inventory = inventory.map((inventoryItem) => {
			if (inventoryItem.item_id === itemId) {
				inventoryItem.cartQty = itemQty;
			}
			return inventoryItem
		})

		this.setState({ inventory: inventory });
	}

	updateCartItemQty(itemId, itemQty) {
		var { cart } = this.state;

		cart = cart.map((cartItem) => {
			if (cartItem.item_id === itemId) {
				cartItem.cartQty = itemQty;
			}
			return cartItem
		})

		this.setState({ cart: cart });
	}

	render() {
		// TODO: clean up unused / unneeded this.state.cart / this.state.inventory references and tidy them up in here
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
						{session.user_id && (<div className="">{`Logged in as ${session.email}`} <button onClick={() => this.logout()}>Log Out</button></div>)}
						{!session.user_id && <Link to="/login" className="login"><button>Login</button></Link>}
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
						<button className="wide-element" onClick={() => this.getPurchaseHistory()}>Get Purchase History</button>
						{
							this.state.purchaseHistory.map((purchaseHistoryItem, i) => {
								return (
									<div className="">
										<p>Purchase ID: {purchaseHistoryItem.purchase_id}</p>
										<p>Purchase date: {purchaseHistoryItem.purchase_date}</p>
										<p>Transaction ID: {purchaseHistoryItem.transaction_id}</p>
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
						<button className="wide-element" onClick={() => this.getCart()}>Get Cart</button>
						<button className="wide-element" onClick={() => this.clearCart()}>Empty Cart</button>
						<button className="wide-element" onClick={() => this.checkout()}>Checkout</button>
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
										<form onSubmit={(e) => { e.preventDefault(); this.updateItemQtyInCart(cartItem.item_id, cartItem.cartQty) }}>
											<input type="number" value={cartItem.cartQty} onChange={(e) => { this.updateCartItemQty(cartItem.item_id, e.target.value); }} />
											<button className="wide-element">Update Item Quantity</button>
										</form>
										<button className="wide-element" onClick={() => { this.modifyCart(cartItem.item_id, 0); }}>Delete from Cart</button>
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
											<form onSubmit={(e) => { e.preventDefault(); this.modifyCart(inventoryItem.item_id, inventoryItem.cartQty) }}>
												<input type="number" value={inventoryItem.cartQty} onChange={(e) => { this.updateItemAddToCartQty(inventoryItem.item_id, e.target.value); }} />
												<button className="wide-element">Add To Cart</button>
											</form>
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