import React from 'react';
import axios from 'axios';
import logo from '../src/logo.jpg';
import { Switch, NavLink, Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from './ducks/reducer';
import AuthComponent from './components/AuthComponent';
import ProfileComponent from './components/ProfileComponent';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="header-class">
          <div class="header-left-corner">
            Purchase
          </div>
          <div className='logo-links-flex'>
            <div className='logo'>
              <img src={logo} alt='logo'/>
            </div>
            <nav className='navlinks'>
              <NavLink activeClassName="active" exact to="/products">Products</NavLink>
              <NavLink activeClassName="active" exact to="/my_orders">My Orders</NavLink>
              {/* {this.props.user || (
                <button onClick={() => {
                  axios.post('/auth/login').then(() => {
                    this.props.setUser(null);
                  });
                }}
                >Login</button>
              )} */}
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
