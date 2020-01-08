import React from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';

export default class Landing extends React.Component {
    componentDidMount() {
        this.props.changeTitle('Login');
    }
    render() {
        return (
            <div className='landing-main'>
                <div className='picture-element'>
                    <div className='header-container'>
                        <h1 >Furniture Store</h1>
                        <h2>Sub-Copy</h2>
                        <Link to='/products'><button className='landing-button'>Shop Now</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}