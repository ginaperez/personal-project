import React, { Component } from 'react';
import axios from 'axios';
import API from '../../api';

class PurchaseHistoryComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            purchaseHistory: []
        }
        this.getPurchaseHistory = this.getPurchaseHistory.bind(this);
    }

    componentDidMount() {
        this.getPurchaseHistory();
    }

    async getPurchaseHistory() {
		const purchaseHistoryResponse = await axios.get(`${API.purchaseHistory}`)

		this.setState({ purchaseHistory: purchaseHistoryResponse.data });
    }
    
    render() {
        const { purchaseHistoryItem } = this.state;
        return (
            <div className="purchase-history">
                {/* <button className="wide-element" onClick={() => this.getPurchaseHistory()}>Purchase History</button> */}
                {
                    this.state.purchaseHistory.map((purchaseHistoryItem, i) => {
                        return (
                            <div className="purchase-history-details">
                                <p>Purchase ID: {purchaseHistoryItem.purchase_id}</p>
                                <p>Purchase date: {purchaseHistoryItem.purchase_date}</p>
                                <p>Transaction ID: {purchaseHistoryItem.transaction_id}</p>
                                <p>{purchaseHistoryItem.user_id}</p>
                                <p>Item ID: {purchaseHistoryItem.item_id}</p>
                                <p>{purchaseHistoryItem.item_name}</p>
                                <p>Qty: {purchaseHistoryItem.item_qty}</p>
                                <p>${purchaseHistoryItem.item_unit_price}.00</p>
                                <p>Total Price: {purchaseHistoryItem.total_price}</p>
                                <p><img src= {purchaseHistoryItem.image} width="200px" /></p>
                            </div>
                        )
                    })
                }
			</div>
        )
    }
}

export default PurchaseHistoryComponent;
