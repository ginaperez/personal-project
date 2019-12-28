import React from 'react';
import './Landing.scss';

export default class Landing extends React.Component {
    componentDidMount() {
        this.props.changeTitle('Login');
    }
    render() {
        return (
            <div className='landing-main'>
                <div className='picture-element'>
                    <div className='header-container'>
                        <h1>Furniture Store</h1>
                    </div>
                </div>
            </div>
        )
    }
}