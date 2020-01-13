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
                        <h1 >Semi Annual Sale</h1>
                        <h2>Sofas, console tables, and so much more.</h2>
                        <Link to='/products'><button className='landing-button'>Shop Now</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}