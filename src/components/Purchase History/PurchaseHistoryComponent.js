import React, { Component } from 'react';
import axios from 'axios';
import API from '../../api';
import './PurchaseHistory.scss';

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
        return (
            <div className="purchase-history">
                {/* <button className="wide-element" onClick={() => this.getPurchaseHistory()}>Purchase History</button> */}
                {
                    this.state.purchaseHistory.map((purchaseHistoryItem, i) => {
                        return (
                            <div className="purchase-history-details">
                                <p><img src= {purchaseHistoryItem.image} width="200px" alt='Purchase History Item'/></p>
                                <p>{purchaseHistoryItem.item_name}</p>
                                <p>${purchaseHistoryItem.item_unit_price}.00</p>
                                <p>Qty: {purchaseHistoryItem.item_qty}</p>
                                <p>Total Price: ${purchaseHistoryItem.total_price}.00</p>
                                <p>Purchase ID: {purchaseHistoryItem.purchase_id}</p>
                                <p>Purchase date: {purchaseHistoryItem.purchase_date}</p>
                                <p>Transaction ID: {purchaseHistoryItem.transaction_id}</p>
                                <p>Item ID: {purchaseHistoryItem.item_id}</p>
                            </div>
                        )
                    })
                }
			</div>
        )
    }
}

export default PurchaseHistoryComponent;
