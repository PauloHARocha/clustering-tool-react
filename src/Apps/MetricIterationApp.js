import React, { Component } from 'react';
import CreateMetricIteration from '../Components/CreateMetricIteration'
// import Iterator from './Iterator'
// import MetricChartList from '../Components/MetricChartList'
import MultiMetricChartList from '../Components/MultiMetricChartList'
import Loader from '../Components/Loader'
import * as ClusteringAPI from '../utils/ClusteringAPI'


class MetricIterationApp extends Component {
  state = {
    loading: false,
    datasets: [],
    algorithms: [],
    // centroids: [],
    // clusters: [],
    met_results: [],
  }
  componentDidMount() {
    ClusteringAPI.getParam().then(param => {
      this.setState({ 
        datasets: param.datasets,
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
        met_results: [],
      })
    // ClusteringAPI.getMetricIterations(values.dataset, values.algorithm, values.k)
    // .then(response => {
    //   this.setState({
    //     loading: false,
    //     // centroids: result.centroids,
    //     // clusters: result.clusters,
    //     met_results: response.results,
    //   })
    ClusteringAPI.getMultiMetricIterations(values.dataset, values.algorithm, values.k, 30)
    .then(response => {
      this.setState({
        loading: false,
        // centroids: result.centroids,
        // clusters: result.clusters,
        met_results: response.results,
      })

    });
    
  }
  render() {
    return (
      <main >
        <CreateMetricIteration 
          datasets={this.state.datasets}
          algorithms={this.state.algorithms}
          onCreateMetricIteration = {values => (
              this.createMetricCharts(values)
              )}
        />
        <Loader loading={this.state.loading}/>
        {/* <Iterator iterations={this.state.centroids}/> */}
        {/* <MetricChartList met_results={this.state.met_results}/> */}
        <MultiMetricChartList met_results={this.state.met_results}/>
      </main>
    );
  }
}

export default MetricIterationApp;
