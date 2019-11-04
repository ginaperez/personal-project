import React from 'react';
import axios from 'axios';
import logo from '../src/logo.jpg';
import { Switch, NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from './ducks/reducer';
import AuthComponent from './components/AuthComponent';
import './App.css';

class App extends React.Component {
  render() {
    return (
    <div className="App">
      <header>
        <div className='logo'>
          <img src={logo} />
        </div>
        <nav>
        <NavLink activeClassName="active" exact to="/products">Products</NavLink>
        <NavLink activeClassName="active" exact to="/my_orders">My Orders</NavLink>
        </nav>
        <div className='right-header'>
          <button className='login'>Login</button>
          <button className='cart'>Cart</button>
        </div>
      </header>
      <Switch>
          <Route exact path="/login" component={AuthComponent} />
      </Switch>
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
