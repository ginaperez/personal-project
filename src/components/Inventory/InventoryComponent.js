import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, showPopup, hidePopup } from '../../redux/reducer';
import axios from 'axios';
import API from '../../api';
import { GoSearch } from 'react-icons/go';
import './Inventory.scss';

class InventoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            searchQuery: "",
            isLoading: true,
            toggle: false,
            user: null
        }
        this.getInventory = this.getInventory.bind(this);
        this.modifyCart = this.modifyCart.bind(this);
        this.searchInventory = this.searchInventory.bind(this);
        this.updateItemAddToCartQty = this.updateItemAddToCartQty.bind(this);
    }

    componentDidMount() {
        this.getInventory();
    };

    async getInventory() {
        try {
            const inventoryResponse = await axios.get('/api/products');
            const inventoryWithInitializedCartQty = inventoryResponse.data.map((inventoryItem) => {
                inventoryItem.cartQty = 1;
                return inventoryItem;
            });
    
            this.setState({ inventory: inventoryWithInitializedCartQty, infoMessage: "" })
        } catch (err) {
            this.setState({infoMessage: err.response.data})
        }
        
    }
    
    async modifyCart(itemId, itemQty) {
		if (itemQty === 0) {
			await axios.delete(`${API.cart}/${itemId}`);
		} else {
            try {
                await axios.put(API.cart, {
                    itemId: itemId,
                    itemQty: itemQty
                });
                this.props.showPopup("Your cart has been successfully updated!");
                setTimeout(this.props.hidePopup, 5000);
            } catch (err) {
                this.props.showPopup("Your cart has failed to update. Please try again!");
                setTimeout(this.props.hidePopup, 5000);
            }
			
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

    async buttonAddToCart (item_id, item_qty) {
        let cart = await axios.put('/api/cart', {item_id, item_qty});
        this.props.addToCart(cart.data);
    };
    
    render() {
        const { searchQuery, infoMessage } = this.state;

        var productInteractionDisplay = <div>{infoMessage}</div>;
        if(infoMessage) {
            productInteractionDisplay = <div>{infoMessage}</div>
        } else {
            const loggedInUser = this.props.user;
            if(loggedInUser) {
                productInteractionDisplay = <div>
                    <button className="wide-element add-to-cart-btn">Add To Cart</button>
                </div>
            } else {
                productInteractionDisplay = <div className='interaction-display'>Please sign in to add products to your cart!</div>
            }
        }

        return (
            <div className='inventory-main-area'>
                <div className="search-area-inventory">
                    <form onSubmit={e => { e.preventDefault(); this.searchInventory(); }}>
                        <input className='search-input-box' value={searchQuery} placeholder="Search..." onChange={(e) => { this.setState({ searchQuery: e.target.value }); }} />
                        <button className='search-button'><GoSearch /></button>
                    </form>
                </div>
                <div className="inventory-grid">
                    {
                        this.state.inventory.map((inventoryItem, i) => {
                            return (
                                <div key={i}>
                                    <div className="inventory-child" key={i}>
                                        <div className="inventory-child-spacer">
                                            <img alt={'Inventory item ' + inventoryItem.item_name} src={inventoryItem.image} width="200px" />
                                        </div>
                                        <div className="inventory-child-spacer">
                                            <h2>{inventoryItem.item_name}</h2>
                                        </div>
                                        <div className="wide-element inventory-child-spacer">
                                            <form onSubmit={(e) => { e.preventDefault(); this.modifyCart(inventoryItem.item_id, inventoryItem.cartQty) }}>
                                                <div className="price-display">
                                                            ${inventoryItem.price}.00
                                                </div>
                                                <div className="item-pairing">
                                                    <input className="item-quantity-change" type="number" value={inventoryItem.cartQty} onChange={(e) => { this.updateItemAddToCartQty(inventoryItem.item_id, e.target.value); }} />
                                                </div>
                                                {productInteractionDisplay}
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

function mapReduxStateToProps(reduxState) {
    return reduxState;
};

const mapDispatchToProps = {
    addToCart,
    showPopup,
    hidePopup
};

const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(InventoryComponent);