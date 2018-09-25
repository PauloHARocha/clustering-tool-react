import React, { Component } from 'react';
import CreateMetricIteration from '../Components/CreateMetricIteration'
// import Iterator from './Iterator'
// import MetricChartList from '../Components/MetricChartList'
import MultiMetricChartList from '../Components/MultiMetricChartList'
import ClusterChartIteration from '../Components/ClusterChartIteration'
import Loader from '../Components/Loader'
import * as ClusteringAPI from '../utils/ClusteringAPI'


class MetricIterationApp extends Component {
  state = {
    loading: false,
    datasets: [],
    algorithms: [],
    centroids: [],
    clusters: [],
    met_results: [],
    show_cluster: false,
    n_sim: 0,
    itr: 0,
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
    if (values.n_sim === undefined)
      return alert('Set number of simulations');
    if (this.state.loading)
      return alert('Wait for the last experiment');
    this.setState(
      { 
        loading: true,
        centroids: [],
        clusters: [],
        met_results: [],
        show_cluster: false,
        n_sim: 0,
        itr: 0,
      })
    // ClusteringAPI.getMetricIterations(values.dataset, values.algorithm, values.k)
    // .then(response => {
    //   this.setState({
    //     loading: false,
    //     // centroids: result.centroids,
    //     // clusters: result.clusters,
    //     met_results: response.results,
    //   })
    ClusteringAPI.getMultiMetricIterations(values.dataset, values.algorithm, values.k, values.n_sim)
    .then(response => {
      this.setState({
        loading: false,
        centroids: response.centroids,
        clusters: response.clusters,
        met_results: response.results,
      })

    });
    
  }
  createClusterChart(values){
    this.setState({
      show_cluster: true,
      n_sim: values.n_sim,
      itr: values.itr,

    })
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
        {this.state.show_cluster && (
          <ClusterChartIteration
            centroids={this.state.centroids[this.state.n_sim]}
            clusters={this.state.clusters[this.state.n_sim]}
            itr={this.state.itr} 
            n_sim={this.state.n_sim} 
          />
        )}
        <MultiMetricChartList 
          met_results={this.state.met_results}
          onClickChart = {values => (
            this.createClusterChart(values)
          )}
          />
      </main>
    );
  }
}

export default MetricIterationApp;
