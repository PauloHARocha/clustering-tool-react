import React, { Component } from 'react';
import CreateCustomDS from '../Components/CreateCustomDS'
import MetricChartList from '../Components/MetricChartList'
import ClusterChartList from '../Components/ClusterChartList'
import Loader from '../Components/Loader'
import * as ClusteringAPI from '../utils/ClusteringAPI'


class CustomDSApp extends Component {
    state = {
        loading: false,
        algorithms: [],
        ds_results: [],
        met_results: [],
    }
    componentDidMount() {
        ClusteringAPI.getParam().then(param => {
            this.setState({
                algorithms: param.algorithms
            })
        })
    }
    createMetricCharts(values) {
        if (values.k === undefined)
            return alert('Set value of k');
        if (this.state.loading)
            return alert('Wait for the last experiment');
        this.setState(
            {
                loading: true,
                ds_results: [],
                met_results: [],
            })
        ClusteringAPI.getCustomDS(values.algorithm, values.k)
            .then(response => {
                this.setState({
                    loading: false,
                    ds_results: response.datasets,
                    met_results: response.metrics,
                })
            });

    }
    render() {
        return (
            <main >
                <CreateCustomDS
                    algorithms={this.state.algorithms}
                    onCreateCustomDS={values => (
                        this.createMetricCharts(values)
                    )}
                />
                <Loader loading={this.state.loading} />
                {/* <Iterator iterations={this.state.centroids}/> */}
                <ClusterChartList ds_results={this.state.ds_results}/>
                <MetricChartList  met_results={this.state.met_results} />
            </main>
        );
    }
}

export default CustomDSApp;
