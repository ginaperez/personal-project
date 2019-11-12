import React from 'react';
import axios from 'axios';
import logo from '../src/logo.jpg';
import { Switch, NavLink, Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from './redux/reducer';
import AuthComponent from './components/AuthComponent';
import ProfileComponent from './components/ProfileComponent';
import SearchComponent from './components/SearchComponent';
import InventoryComponent from './components/InventoryComponent'
import LoginComponent from './components/LoginComponent';
import './App.scss';
import CartComponent from './components/CartComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: []
    };
    this.getInventory = this.getInventory.bind(this);
    this.getItemByName = this.getItemByName.bind(this);
  }

  componentDidMount() {
    this.getInventory();
  }

  getInventory() {
    axios.get(`/api/inventory`).then(response => {
      this.setState({
        allItems: response.data
      });
    });
  }

  getItemByName(name) {
    axios.get(`/api/inventory/${name}`).then(response => {
      if(response.data) {
        this.setState({
          allItems: [response.data]
        })
      } else {
        this.setState({
          allItems: []
        });
      }})
      .catch(err => {
        this.setState({
          allItems: []
        });
        console.log(err);
      });
  }
  
  render() {
    return (
      <div className="App">
        <header className="header-class">
          <div class="header-left-corner">
            <Link to="/search" className="search"></Link>
            <SearchComponent />
          </div>
          <div className='logo-links-flex'>
            <div className='logo'>
              <img src={logo} alt='logo'/>
            </div>
            <nav className='navlinks'>
              <NavLink activeClassName="active" exact to="/products">Products</NavLink>
              <NavLink activeClassName="active" exact to="/my_orders">My Orders</NavLink>
            </nav>
          </div>
          <div className='header-right-corner'>
            <Link to="/login" className="login"><button>Log In</button></Link>
          </div>
        </header>
        <Switch>
            <Route exact path="/login" component={AuthComponent} />
            <Route exact path="/my_orders" component={ProfileComponent} />
        </Switch>
        <CartComponent />
      </div>
    );
  }
};

function mapReduxStateToProps(reduxState) {
  return reduxState
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps)

export default invokedConnect(withRouter(App));
