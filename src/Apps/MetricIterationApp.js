import React, { Component } from 'react';
import CreateScenario from '../Components/CreateScenario'
import CreateMetricIteration from '../Components/CreateMetricIteration'
import MultiMetricChartList from '../Components/MultiMetricChartList'
import ClusterChartIteration from '../Components/ClusterChartIteration'
import Loader from '../Components/Loader'
import * as ClusteringAPI from '../utils/ClusteringAPI'


class MetricIterationApp extends Component {
  state = {
    loading: false,
    datasets: [],
    algorithms: [],
    scenarios: [],
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
        algorithms: param.algorithms,
        scenarios: param.scenarios.iterations
      })
      
    })
  }
  createMetricCharts = (values) => {
    if (values.k === undefined)
      return alert('Set value of k');
    if (values.n_sim === undefined)
      return alert('Set number of simulations');
    if (this.state.loading)
      return alert('Wait for the last experiment');
    this.beforeResponse();
    ClusteringAPI.getMultiMetricIterations(values.dataset, values.algorithm, values.k, values.n_sim)
    .then(response => {
      this.afterResponse(response);
    });
    
  }
  createClusterChart = (values) => {
    this.setState({
      show_cluster: true,
      n_sim: values.n_sim,
      itr: values.itr,
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
        centroids: [],
        clusters: [],
        met_results: [],
        show_cluster: false,
        n_sim: 0,
        itr: 0,
      })
  }
  afterResponse = (response) => {
    this.setState({
      loading: false,
      centroids: response.centroids,
      clusters: response.clusters,
      met_results: response.results,
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
        <CreateScenario 
          scenarios={this.state.scenarios} 
          onCreateScenario={values => (
            this.createScenarioCharts(values)
          )}/>
        <Loader loading={this.state.loading}/>
        
        {this.state.show_cluster && (
          <ClusterChartIteration
            centroids={this.state.centroids[this.state.n_sim][this.state.itr]}
            clusters={this.state.clusters[this.state.n_sim][this.state.itr]}
            title={`Sim: ${this.state.n_sim} Itr: ${this.state.itr}`}
            axis={{ x: { minimum: 0, maximum: 1 }, y: {minimum: 0, maximum:1}}}
            size={{ heigth: 250, width: 'medium' }} //large, medium, small
          />
        )}
        <MultiMetricChartList 
          met_results={this.state.met_results}
          axis={{ x: 'Values', y: 'Iterations' }}
          size={{ heigth: 300, width: 'large'}} //large, medium, small
          onClickChart = {values => (
            this.createClusterChart(values)
          )}
          />
      </main>
    );
  }
}

export default MetricIterationApp;
