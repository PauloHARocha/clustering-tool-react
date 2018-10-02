import React, { Component } from 'react';
import serializeForm from 'form-serialize'

class SelectClusterChart extends Component {
    state = {
        itr: 0,
    }
    handleSubmit = e => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true })
        this.props.onSelectClusterChart(values);
    }
    handleChange = e => {
        this.setState({itr: e.target.value});
    }
    render() {
        const { met_results } = this.props;
        let labels = this.props.labels ? this.props.labels : {}; 
        return (
            met_results.length > 0 &&
            <section>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor="n_sim">{labels.sim ? labels.sim : 'Simulation'}</label>
                        <select name='n_sim' className="slc" 
                                onChange={this.handleChange}>
                            {met_results[0].values.map((mtr,idx) => (
                                <option key={idx} value={idx}>{idx}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="itr">{labels.itr ? labels.itr : 'Iteration'}</label>
                        <select name='itr' className="slc">
                            {met_results[0].values[this.state.itr].map((mtr,idx) => (
                                <option key={idx} value={idx}>{idx}</option>
                            ))}
                        </select>
                    </div>
                    <input type='submit' value='Show' className='btn' />
                </form>
            </section>
        );
    }
}

export default SelectClusterChart;