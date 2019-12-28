import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from './redux/reducer';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import AuthComponent from './components/Auth/AuthComponent';
import PurchaseHistoryComponent from './components/Purchase History/PurchaseHistoryComponent';
import InventoryComponent from './components/Inventory/InventoryComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Login'
	};
	this.changeTitle = this.changeTitle.bind(this);
  }

  changeTitle(title) {
    this.setState({
      title: title
    });
  }

  render() {
    return (
      <div className='App'>
        <Header title={this.state.title} user={this.props.user} />
        <Switch>
          <Route exact path='/' render={props => (
            <Landing changeTitle={this.changeTitle} {...props}/>
          )}
          />
          <Route path='/login-register' render={props => (
            <AuthComponent changeTitle={this.changeTitle} {...props} />
          )}
          />
          {this.props.user && (
            <Route path='/inventory' render={props => (
              <InventoryComponent changeTitle={this.changeTitle} {...props} />
            )}
            />
          )}
          {this.props.user && (
            <Route path='/purchase_history' render={props => (
              <PurchaseHistoryComponent changeTitle={this.changeTitle} {...props} />
            )}
            />
          )}
          <Route path='*' render={() => {
            return <Redirect to='/inventory' />;
          }}
          />
        </Switch>
      </div>
    );
  }
}

function mapReduxStateToProps (reduxState) {
  return reduxState
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(withRouter(App));





// import React, {Component} from 'react';
// import { setUser } from './redux/reducer';
// import { connect } from 'react-redux';
// import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
// import reducer from './redux/reducer';
// import AuthComponent from './components/Auth/AuthComponent';
// import PurchaseHistoryComponent from './components/Purchase History/PurchaseHistoryComponent';
// import CartComponent from './components/Cart/CartComponent';
// import InventoryComponent from './components/Inventory/InventoryComponent';
// // import { getPurchaseHistory } from PurchaseHistoryComponent;
// import axios from 'axios';
// import logo from '../src/logo.jpg';
// import API from './api';

// class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			searchQuery: "",
// 		};
// 		this.searchInventory = this.searchInventory.bind(this);
// 	}

// 	componentDidMount() {
//        console.log(this.props.user);
// 	}

// 	async getSession() {
// 		const session = await axios.get(API.session);
// 		this.setState({ session: session.data })
// 	}

// 	async searchInventory() {
// 		const { searchQuery } = this.state;
// 		const inventoryResponse = await axios.get(`${API.search}?query=${searchQuery}`);

// 		this.setState({ inventory: inventoryResponse.data })
//     }
    
//     async logout() {
//         const { session } = this.state;
//         const destroyedSession = await axios.post(API.logout, {});
    
//         this.setState({ session: { email: "", user_id: null } });
//     }

// 	render() {
//         const { session, inventory, searchQuery } = this.state;
// 		return (
// 			<div className="app">
// 				<header className="header-class">
// 					<div className="header-left-corner">
// 						<div className="search-area">
// 							<form onSubmit={e => { e.preventDefault(); this.searchInventory(); }}>
// 								<label>Search:</label>
// 								<input value={searchQuery} onChange={(e) => { this.setState({ searchQuery: e.target.value }); }} />
// 								<button>Search</button>
// 							</form>
// 						</div>
// 					</div>
// 					<div className='logo-links-flex'>
// 						<div className='logo'>
// 							<img src={logo} alt='logo' />
// 						</div>
// 						<nav className='navlinks'>
//                             <div className="navlink-buttons">
//                             <NavLink className="cart-navlink" activeClassName="active" exact to="/my_cart">View Cart</NavLink>
// 							<NavLink className="ph-navlink"activeClassName="active" exact to="/my_orders">Purchase History</NavLink>
//                             <NavLink className="products-navlink" activeClassName="active" exact to="/">Products</NavLink>
//                             </div>
// 						</nav>
// 					</div>
// 					<div className='header-right-corner'>
//                         {this.props.user && (<div className="user-salutation">{`Hi, ${this.props.user.email}`} <button onClick={() => this.logout()}>Log Out</button></div>)}
// 						{!this.props.user && <NavLink to="/login" className="login">Login</NavLink>}
// 					</div>
// 				</header>
					
// 						<Switch>
//                             <Route exact path="/" component={InventoryComponent}/>
// 							<Route path="/login" component={AuthComponent} />
// 							<Route path="/my_orders" component={PurchaseHistoryComponent} />
//                             <Route path="/my_cart" component={CartComponent} />
// 						</Switch>
// 				</div>
//         )
// 	}
// }

// function mapReduxStateToProps(reduxState) {
//     return reduxState
// }

// const mapDispatchToProps = {
//     setUser
// }

// const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

// export default invokedConnect(withRouter(App));