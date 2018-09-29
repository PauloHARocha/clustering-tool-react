import React, { Component } from 'react';
import serializeForm from 'form-serialize'

class CreateCustomDS extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true })
        this.props.onCreateCustomDS(values);
    }
    render() {
        const { algorithms, ds } = this.props
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor="ds">DS</label>
                        <select name='ds' className="slc">
                            {ds.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="algorithm">Algorithm</label>
                        <select name='algorithm' className="slc">
                            {algorithms.map(algorithm => (
                                <option key={algorithm.name} value={algorithm.value}>{algorithm.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="k">k</label>
                        <input type="number" name="k" max="50" min="2" placeholder='2' />
                    </div>
                    <input type='submit' value='Run' className='btn' />
                </form>
            </section>
        );
    }
}

export default CreateCustomDS;