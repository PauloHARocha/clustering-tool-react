import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MetricIterationApp from './MetricIterationApp'
import CustomDSApp from './CustomDSApp'

class App extends Component {
    
    render() {
        return (
            <div id='Apps'>
                <header className="navigation">
                    <h1>Clustering tool</h1>
                    <button tabIndex='-1' className="navigation-link">
                        <Link to='/clustering-tool-react' >Metric Iterations</Link>
                    </button>
                    <button tabIndex='-1' className="navigation-link">
                        <Link to='/clustering-tool-react/customds' >CustomDS</Link>
                    </button>
                </header>
                <Route exact path='/clustering-tool-react' render={() => (
                    <MetricIterationApp />
                )}/>
                <Route exact path='/clustering-tool-react/customds' render={() => (
                    <CustomDSApp/>
                )} />                
            </div>
        );
    }
}

export default App;

