import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCart } from '../redux/cartReducer'

class CartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        console.log(1111, this.props)
    }

    render() {
        return (
            <div>
                <h1>Cart</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { getUser })(CartComponent)