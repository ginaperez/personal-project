import React, { Component } from 'react';

// import CartIcon from 'react-icons/lib/fa/shopping-cart';

import { connect } from 'react-redux';
import { searchItems } from '../../../redux/reducer';

class Search extends Component {
    constructor() {
        super();
        this.state= {
            category: ""
        };
        this.showCart = this.showCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    showCart() {
        const { history } = this.props;
        history.push('/checkout');
    }

    handleChange(event) {
        this.setState({ category: event.target.value });
    }

    search(event) {
        if( event.key === "Enter") {
            const { searchItems } = this.props;
            const { category } = this.state;

            searchItems(category);
        }
    }

    render() {
        const { cart } = this.props;
        return (
            <div id="Search_parent">
                <div id="Search_child">
                    <input id="Search_input" placeholder="Search by item type..." onKeyDown={ this.search } onChange={ this.handleChange } />
                    <div id="Search_cartContainer" onClick={ this.showCart }>
                        <span id="Search_cartNumber">{ cart.length }</span>
                        {/* <CartIcon id="Search_cartIcon" />     */}
                    </div> 
                </div>
            </div>
        )
    }
}

export default connect(state => state, { searchItems })(Search);