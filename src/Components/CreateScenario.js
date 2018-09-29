import React, { Component } from 'react';
import serializeForm from 'form-serialize'

class CreateScenario extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true })
        this.props.onCreateScenario(values);
    }
    render() {
        const { scenarios } = this.props
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor="scenario">Scenario</label>
                        <select name='scenario' className="slc">
                            {scenarios.map(scenario => (
                                <option key={scenario.name} value={scenario.value}>{scenario.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type='submit' value='Run' className='btn' />
                </form>
            </section>
        );
    }
}

export default CreateScenario;