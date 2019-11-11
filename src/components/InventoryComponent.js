import React from 'react';

export default class InventoryComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products
        }
    }

    render() {
        <div>
            {
                this.state.products.map((product, i) => {
                    return (
                        <div key={i}>
                            <h2>{product.name}</h2>
                        </div>
                    )
                })
            }
        </div>
    }
}