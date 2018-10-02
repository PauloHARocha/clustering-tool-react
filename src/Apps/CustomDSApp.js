import React, { Component } from 'react';
import CreateScenario from '../Components/CreateScenario'
import MultiMetricChartList from '../Components/MultiMetricChartList'
import ClusterChartIteration from '../Components/ClusterChartIteration'
import ClusterChartList from '../Components/ClusterChartList'
import SelectClusterChart from '../Components/SelectClusterChart'
import Loader from '../Components/Loader'
import Error from '../Components/Error'
import * as ClusteringAPI from '../utils/ClusteringAPI'


class CustomDSApp extends Component {
    state = {
        loading: false,
        error: false,
        algorithms: [],
        ds_results: [],
        scenarios: [],
        met_results: [],
        show_cluster: false,
        n_sim: 0,
        ds: 0,
    }
    componentDidMount() {
        this.setState({loading: true})
        ClusteringAPI.getParam().then(param => {
            this.setState({
                algorithms: param.algorithms,
                scenarios: param.scenarios.customds,
                loading: false
            })
        }).catch(error => (this.showError(error)))
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
            }).catch(error => (this.showError(error)))
    }
    beforeResponse = () => {
        this.setState(
            {
                loading: true,
                show_cluster: false,
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
    showError = (error) => {
        console.log(error);
        this.setState({
            loading: false,
            error: true
        })
    }
    render() {
        return (
            <main >
                <Error error={this.state.error} />
                
                <CreateScenario
                    scenarios={this.state.scenarios}
                    onCreateScenario={values => (
                        this.createScenarioCharts(values)
                    )} />
                <Loader loading={this.state.loading} />

                <ClusterChartList ds_results={this.state.ds_results} sim={this.state.n_sim} />

                <SelectClusterChart
                    met_results={this.state.met_results}
                    labels={{itr:'Datasets'}}
                    onSelectClusterChart={values => (this.createClusterChart(values))} />
                
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
                    axis={{ x: 'Datasets', y: 'Values'}}
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
