import React, { Component } from 'react';

class Error extends Component {

    render() {
        const { error } = this.props;
        return (
            <div className='error-container'>
                {error && (
                <div className='error-content'>
                    An error occurred, check your internet connection and refresh the page.
                </div>)}
            </div>
        )


    }
}

export default Error;