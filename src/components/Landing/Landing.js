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
                        <h1 >Furniture Store</h1>
                        <h2>Sub-Copy</h2>
                        <button className='landing-button' onClick={() => {
                            
                        }}>Shop Now</button>
                    </div>
                </div>
                {/* <div className='first-content-block'>
                    First Content Block
                </div>
                <div className='second-content-block'>
                    Second Content Block
                </div>
                <div className='third-content-block'>
                    Third Content Block
                </div>
                <div className='fourth-content-block'>
                    Fourth Content Block
                </div> */}
            </div>
        )
    }
}