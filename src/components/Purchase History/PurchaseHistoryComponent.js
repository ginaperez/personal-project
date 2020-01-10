import React, { Component } from 'react';
import axios from 'axios';
import API from '../../api';
import { connect } from 'react-redux';
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
                            <div className="purchase-history-details"  key={i}>
                                <p><img src= {purchaseHistoryItem.image} width="200px" alt='Purchase History Item'/></p>
                                <p className='ph-item-name'>{purchaseHistoryItem.item_name}</p>
                                <p className='ph-item'>${purchaseHistoryItem.item_unit_price}.00</p>
                                <p className='ph-item'>Qty: {purchaseHistoryItem.item_qty}</p>
                                <p className='ph-item'>Total Price: ${purchaseHistoryItem.total_price}.00</p>
                                <p className='ph-item'>Purchase ID: {purchaseHistoryItem.purchase_id}</p>
                                <p className='ph-item'>Purchase date: {purchaseHistoryItem.purchase_date}</p>
                                <p className='ph-item'>Transaction ID: {purchaseHistoryItem.transaction_id}</p>
                                <p className='ph-item'>Item ID: {purchaseHistoryItem.item_id}</p>
                            </div>
                        )
                    })
                }
			</div>
        )
    }
}

function mapReduxStateToProps(reduxState) {
    return reduxState
}

export default connect(mapReduxStateToProps)(PurchaseHistoryComponent);
