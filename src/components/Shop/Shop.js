import React, { Component } from 'react';
import { connect } from 'tls';

// import User from '../User/User';
// import SignOut from '../SignOut/SignOut';
// import Search from './Search/Search';
// import Item from './Items/Item';

// import { connect } from 'react-redux';
// import { getItem, getUser } from '../../redux/reducer';

class Shop extends Component {
    componentDidMount() {
        const { getItem, getUser } = this.props;
        getUser();
        getItem();
    }

    render() {
        const { history, item } = this.props;
        const itemComponents = item.map(item => (
            <Item key={ item.id } title={ item.name } price={ item. price } id={ item. id} />
        ));

        return (
            <div id="Shop_parent">
                <User />
                <SignOut history={ history } />

                <div id="Shop_child">
                    <Search history={ history } />

                    <div id="Shop_itemParent">
                        <div id="Shop_itemChild">
                            { itemComponents }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { getItem, getUser })(Shop);