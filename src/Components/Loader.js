import React, { Component } from 'react';

class Loader extends Component {
    
    render() {
        const { loading } = this.props;
        return(
            <div className='loader-container'>
                {loading && (<div className='loader-content'>
                    <div className="loader"></div>
                    <p>Do not change section, this can take a few minutes . . .</p>
                    </div>)}
            </div>
        ) 
            
        
    }
}

export default Loader;