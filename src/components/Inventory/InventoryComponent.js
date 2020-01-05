import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/reducer';
import axios from 'axios';
import Header from '../Header/Header';
import API from '../../api';

export default class InventoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            searchQuery: "",
            isLoading: true,
            toggle: false
        }
        this.getInventory = this.getInventory.bind(this);
        this.modifyCart = this.modifyCart.bind(this);
        this.searchInventory = this.searchInventory.bind(this);
        this.updateItemAddToCartQty = this.updateItemAddToCartQty.bind(this);
    }

    componentDidMount() {
        this.getInventory();
        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 2000);
    }

    async getInventory() {
		const inventoryResponse = await axios.get('/api/products');
		const inventoryWithInitializedCartQty = inventoryResponse.data.map((inventoryItem) => {
			inventoryItem.cartQty = 1;
			return inventoryItem;
		});

		this.setState({ inventory: inventoryWithInitializedCartQty })
    }
    
    async modifyCart(itemId, itemQty) {
		if (itemQty === 0) {
			const cartResponse = await axios.delete(`${API.cart}/${itemId}`);
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		} else {
			const cartResponse = await axios.put(API.cart, {
				itemId: itemId,
				itemQty: itemQty
			});
			console.log(cartResponse.data[0].item_id, cartResponse.data[0].item_qty);
		}
    }

    async searchInventory() {
		const { searchQuery } = this.state;
		const inventoryResponse = await axios.get(`${API.search}?query=${searchQuery}`);

		this.setState({ inventory: inventoryResponse.data })
    }

    updateItemAddToCartQty(itemId, itemQty) {
		var { inventory } = this.state;

		inventory = inventory.map((inventoryItem) => {
			if (inventoryItem.item_id === itemId) {
				inventoryItem.cartQty = itemQty;
			}
			return inventoryItem
		})

		this.setState({ inventory: inventory });
    }
    
    toggler() {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle
            };
        });
    }
    
    render() {
        const { inventory, searchQuery } = this.state;
        return (
            <div>
                <div className="search-area-inventory">
                    <form onSubmit={e => { e.preventDefault(); this.searchInventory(); }}>
                        <label>Search:</label>
                        <input value={searchQuery} onChange={(e) => { this.setState({ searchQuery: e.target.value }); }} />
                        <button>Search</button>
                    </form>
                </div>
                <div className="inventory-grid">
                    {
                        this.state.inventory.map((inventoryItem, i) => {
                            return (
                                <div>
                                    {
                                        inventory.map((inventoryItem) => {
                                            // <div className='card' key={i}>
                                            //     <div className='card-body'>
                                            //         <h5 className='card-title'>{inventoryItem.item_name}</h5>
                                            //         <h6 className='card-price'>${inventoryItem.price}</h6>
                                            //     </div>
                                            // </div>
                                        })
                                    }
                                    <div className="inventory-child" key={i}>
                                        <div className="inventory-child-spacer">
                                            <img alt={'Inventory item ' + inventoryItem.item_name} src={inventoryItem.image} width="200px" />
                                        </div>
                                        <div className="inventory-child-spacer">
                                            <h2>{inventoryItem.item_name}</h2>
                                        </div>
                                        <div className="wide-element inventory-child-spacer">
                                            <form onSubmit={(e) => { e.preventDefault(); this.modifyCart(inventoryItem.item_id, inventoryItem.cartQty) }}>
                                                <div className="item-pairing">
                                                    <input className="item-quantity-change" type="number" value={inventoryItem.cartQty} onChange={(e) => { this.updateItemAddToCartQty(inventoryItem.item_id, e.target.value); }} />
                                                    <div className="price-display">
                                                        ${inventoryItem.price}
                                                    </div>
                                                </div>
                                                <button className="wide-element add-to-cart-btn">Add To Cart</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}