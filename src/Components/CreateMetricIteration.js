import React, { Component } from 'react';
import serializeForm from 'form-serialize'

class CreateMetricIteration extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true })
        this.props.onCreateMetricIteration(values);
    }
    render() {
        const { datasets, algorithms } = this.props
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor="dataset">Dataset</label>
                        <select name='dataset' className="slc">
                        {datasets.map(dataset => (
                            <option key={dataset.name} value={dataset.value}>{dataset.name}</option>
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
                        <input type="number" name="k" max="50" min="2" placeholder='2'/>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="n_sim">n sim</label>
                        <input type="number" name="n_sim" max="30" min="1" placeholder='1' />
                    </div>
                    <input type='submit' value='Run' className='btn'/>
                </form>
            </section>
        );
    }
}

export default CreateMetricIteration;