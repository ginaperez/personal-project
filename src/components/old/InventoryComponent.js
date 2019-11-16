import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import axios from 'axios';

class InventoryComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inventory: []
        }
        this.getInventory = this.getInventory.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        axios.get('/api/inventory').then(res => {
            console.log(res);
            this.setState({
                inventory: res.data
            });
        });
    }


    getInventory() {
        axios.get('/api/inventory').then(res => {
            console.log(res);
            this.setState({
                inventory: res.data
            });
        });
    }

    // TODO: Finish this! Add a cart to your state and add the id to it
    addToCart(id) {
        console.log(id);
    }

    render() {
        return(
        <div className="inventory-grid">
            {
                this.state.inventory.map((inventoryItem, i) => {
                    return (
                        <div className="inventory-child" key={i}>
                            <div className="inventory-child-spacer">
                                <img alt={'Inventory item ' + inventoryItem.item_name} src={inventoryItem.image} width="200px"/>
                            </div>
                            <div className="inventory-child-spacer">
                                <h2>{inventoryItem.item_name}</h2>
                            </div>
                            <div className="wide-element inventory-child-spacer">
                                <button className="wide-element" onClick={ () => this.addToCart(inventoryItem.item_id) }>Add To Cart</button>
                            </div>
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
