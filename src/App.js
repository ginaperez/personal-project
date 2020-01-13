import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, showPopup } from './redux/reducer';
import { MdCancel } from 'react-icons/md';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import AuthComponent from './components/Auth/AuthComponent';
import PurchaseHistoryComponent from './components/Purchase History/PurchaseHistoryComponent';
import InventoryComponent from './components/Inventory/InventoryComponent';
import CartComponent from './components/Cart/CartComponent';
import './App.scss';

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
    const { popupMessage } = this.props;
    var popupMessageDisplay = <div className="popup"><span className="closePopup" onClick={() => {this.props.showPopup("");}}><MdCancel /></span>{popupMessage}</div>
    if (popupMessage === "") {
      popupMessageDisplay = <div className="popup-hidden"></div>
    }
    return (
      <div className='App'>
        <Header title={this.state.title} user={this.props.user} />
        {popupMessageDisplay}
        <Switch>
          <Route exact path='/' render={props => (
            <Landing changeTitle={this.changeTitle} {...props}/>
          )}
          />
          <Route path='/login-register' render={props => (
            <AuthComponent changeTitle={this.changeTitle} {...props} />
          )}
          />
          <Route path='/cart' render={props => (
            <CartComponent changeTitle={this.changeTitle} {...props} />
          )}
          />
            <Route path='/products' render={props => (
              <InventoryComponent changeTitle={this.changeTitle} {...props} />
            )}
            />
          }
          {this.props.user && (
            <Route path='/purchase_history' render={props => (
              <PurchaseHistoryComponent changeTitle={this.changeTitle} {...props} />
            )}
            />
          )}
          <Route path='*' render={() => {
            return <Redirect to='/' />;
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
  setUser,
  showPopup
};

const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(withRouter(App));
