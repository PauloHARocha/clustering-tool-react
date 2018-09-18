import React, { Component } from 'react';
import serializeForm from 'form-serialize'

class CreateCustomDS extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true })
        this.props.onCreateCustomDS(values);
    }
    render() {
        const { algorithms } = this.props
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
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