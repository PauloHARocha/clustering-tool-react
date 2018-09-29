import React, { Component } from 'react';
import CreateScenario from '../Components/CreateScenario'
import MultiMetricChartList from '../Components/MultiMetricChartList'
import ClusterChartIteration from '../Components/ClusterChartIteration'
import ClusterChartList from '../Components/ClusterChartList'
import Loader from '../Components/Loader'
import * as ClusteringAPI from '../utils/ClusteringAPI'


class CustomDSApp extends Component {
    state = {
        loading: false,
        algorithms: [],
        ds_results: [],
        scenarios: [],
        met_results: [],
        show_cluster: false,
        n_sim: 0,
        ds: 0,
    }
    componentDidMount() {
        ClusteringAPI.getParam().then(param => {
            this.setState({
                algorithms: param.algorithms,
                scenarios: param.scenarios.customds
            })
        })
    }
    createClusterChart(values) {
        this.setState({
            show_cluster: true,
            n_sim: values.n_sim,
            ds: values.itr,
        })
    }
    createScenarioCharts = (values) => {
        this.beforeResponse();
        ClusteringAPI.getScenario(values.scenario)
            .then(response => {
                this.afterResponse(response);
            })
    }
    beforeResponse = () => {
        this.setState(
            {
                loading: true,
                ds_results: [],
                met_results: [],
            })
    }
    afterResponse = (response) => {
        this.setState({
            loading: false,
            ds_results: response.datasets,
            met_results: response.metrics,
        })
    }
    render() {
        return (
            <main >
                <CreateScenario
                    scenarios={this.state.scenarios}
                    onCreateScenario={values => (
                        this.createScenarioCharts(values)
                    )} />
                <Loader loading={this.state.loading} />
                <ClusterChartList ds_results={this.state.ds_results} sim={this.state.n_sim} />
                {this.state.show_cluster && (
                    <ClusterChartIteration
                        centroids={this.state.ds_results[this.state.ds].centroids[this.state.n_sim]}
                        clusters={this.state.ds_results[this.state.ds].clusters[this.state.n_sim]}
                        title={`Sim: ${this.state.n_sim} Ds: ${this.state.ds}`}
                        axis={{ x: { minimum: -1, maximum: 1 }, y: { minimum: -1, maximum: 1 } }}
                        size={{ heigth: 300, width: 'large' }} //large, medium, small
                    />
                )}
                <MultiMetricChartList
                    met_results={this.state.met_results}
                    axis = {{x:'Values', y: 'Datasets'}}
                    size={{ heigth: 300, width: 'large' }} //large, medium, small
                    onClickChart={values => (
                        this.createClusterChart(values)
                    )}
                />
            </main>
        );
    }
}

export default CustomDSApp;
