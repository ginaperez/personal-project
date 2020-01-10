import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { getCart } from '../redux/cartReducer';
import API from '../../api';
import './Cart.scss';

class CartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
        this.getCart = this.getCart.bind(this);
		this.checkout = this.checkout.bind(this);
		this.updateItemAddToCartQty = this.updateItemAddToCartQty.bind(this);
        this.updateCartItemQty = this.updateCartItemQty.bind(this);
        this.modifyCart = this.modifyCart.bind(this);
    }

    componentDidMount() {
        this.getCart();
    }

    async getCart() {
		try {
			const cartResponse = await axios.get(API.cart);
			const cartWithInitializedCartQty = cartResponse.data.map((cartItem) => {
				cartItem.cartQty = cartItem.item_qty;
				return cartItem;
			});

			this.setState({ cart: cartWithInitializedCartQty, infoMessage: "" });
	 	} catch (err) {
			this.setState({infoMessage: err.response.data});
		}
	}

	// modifyCart will ADD itemQty to the cart, or it will insert the new
	// itemId into the cart w/ itemQty if it is not in the cart yet
	async modifyCart(itemId, itemQty) {
		if (itemQty === 0) {
			await axios.delete(`${API.cart}/${itemId}`);
		} else {
			await axios.put(API.cart, {
				itemId: itemId,
				itemQty: itemQty
			});
		}
		this.getCart();
	}

	// updateItemQtyInCart will SET the itemQty for the given itemId in the cart
	// This is different from modifyCart in that it only works on existing cart itemsx
	async updateItemQtyInCart(itemId, itemQty) {
		if (itemQty === 0) {
			await axios.delete(`${API.cart}/${itemId}`);
		} else {
			await axios.patch(API.cart, {
				itemId: itemId,
				itemQty: itemQty
			});
		}
		this.getCart();
	}

	async clearCart() {
		const freshCart = await axios.delete(API.cart);

		this.setState({ cart: freshCart.data });
		this.getCart();
    }
    
    async getPurchaseHistory() {
		const purchaseHistoryResponse = await axios.get(`${API.purchaseHistory}`)

		this.setState({ purchaseHistory: purchaseHistoryResponse.data });
    }

	async checkout() {
		const freshCart = await axios.post(API.checkout);

		this.setState({ cart: freshCart.data });
		this.getPurchaseHistory();
		this.getCart();
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

	updateCartItemQty(itemId, itemQty) {
		var { cart } = this.state;

		cart = cart.map((cartItem) => {
			if (cartItem.item_id === itemId) {
				cartItem.cartQty = itemQty;
			}
			return cartItem
		})

		this.setState({ cart: cart });
	}


    render() {
		const { infoMessage, cart } = this.state;
		
		var cartInteractionDisplay = <div>{infoMessage}</div>;
		if (infoMessage) {
			cartInteractionDisplay = <div>{infoMessage}</div>;
		} else {
			if (cart.length) {
				cartInteractionDisplay = <div className='interaction-display'>
					<button className="wide-element" onClick={() => this.clearCart()}>Empty Cart</button>
					<button className="wide-element" onClick={() => this.checkout()}>Checkout</button>
				</div>
			} else {
				cartInteractionDisplay = <div className='empty-cart-display'>
					Your cart is empty!
				</div>
			}
		}

        return (
            <div className="cart-view">
						{
							this.state.cart.map((cartItem, i) => {
								return (
									<div className="cart-view" key={i}>
                                        <div className="cart-item">
                                        <p><img className="cart-item-picture" src={cartItem.image} alt='Cart Item'/></p>
                                        <p className='cart-item-name'>{cartItem.item_name}</p>
										<p>${cartItem.item_unit_price}.00</p>
                                        <p>Qty: {cartItem.item_qty}</p>
										<p>Total Price: ${cartItem.total_price}.00</p>
                                        
										<form onSubmit={(e) => { e.preventDefault(); this.updateItemQtyInCart(cartItem.item_id, cartItem.cartQty) }}>
											<input type="number" value={cartItem.cartQty} onChange={(e) => { this.updateCartItemQty(cartItem.item_id, e.target.value); }} />
											<button className="form-button">Update Item Quantity</button>
										</form>
										<button className="form-button" onClick={() => { this.modifyCart(cartItem.item_id, 0); }}>Delete from Cart</button>
									</div>
                                    </div>
								)
							})
						}
						<div className='bottom-buttons'>
							{cartInteractionDisplay}
						</div>
					</div>
        )
    }
}

function mapReduxStateToProps(reduxState) {
    return reduxState
}

export default connect(mapReduxStateToProps)(CartComponent)