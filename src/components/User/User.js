import React from 'react';

import { FaUserAlt } from 'react-icons/fa';

import { connect } from 'react-redux';

function User({ user }) {
    return (
        <div id="User_parent">
            <FaUserAlt id="User_icon" />
            <span>{ user || 'Guest' }</span>
        </div>
    )
}

export default connect(state => state)(User);
