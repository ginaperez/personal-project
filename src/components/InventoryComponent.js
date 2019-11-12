import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import axios from 'axios';

class InventoryComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        console.log(2222, this.props)
        axios.get('/api/get_cart').then(res => {
            console.log(333, res)
            this.setState({
                products: res.data
            })
        })
    }

    buttonAddToCart = (id) => {
        let cart = axios.post('/api/addToCart', {id})
        this.props.addToCart(cart)
    }

    render() {
        return(
        <div>
            {
                this.state.products.map((product, i) => {
                    return (
                        <div key={i}>
                            <h2>{product.name}</h2>
                            <button onClick={() => this.buttonAddToCart(
                                product.id
                            )}>Add To Cart</button>
                        </div>
                    )
                })
            }
        </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { addToCart })(InventoryComponent)