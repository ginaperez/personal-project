import React from 'react';

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemSearch: ""
        };
    }

    universalInput(property, value) {
        this.setState({
            [property]: value
        });
    }

    render() {
        const { itemSearch } = this.state;
        return (
            <form onSubmit={e => {
                e.preventDefault();
                this.props.getItemByName(this.state.itemSearch);
            }}>
                <p className="search-form">
                    <label>Search:</label>
                    <input value={itemSearch} onChange={(e) => this.universalInput("itemSearch", e.target.value)} />
                </p>
            </form>
        )
    }
}