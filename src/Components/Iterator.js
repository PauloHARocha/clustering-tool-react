import React, { Component } from 'react';

class Iterator extends Component {
    render() {
        const {iterations} = this.props;
        return (
            <section id="iterations">
            {iterations.length > 0 && (
                <div className='form-element'>
                    <label htmlFor="iterator">Iterations</label>
                    <select id="iterator" className="slc">
                        {iterations.map((itr, idx) => (
                            <option key={idx} value={idx}>{idx}</option>
                        ))}
                    </select>
                </div>

            )}
            </section>
        )
    }
}

export default Iterator;