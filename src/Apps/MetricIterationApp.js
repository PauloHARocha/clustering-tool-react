import React, { Component } from 'react';
import CreateScenario from '../Components/CreateScenario'
import MultiMetricChartList from '../Components/MultiMetricChartList'
import ClusterChartIteration from '../Components/ClusterChartIteration'
import Loader from '../Components/Loader'
import Error from '../Components/Error'
import * as ClusteringAPI from '../utils/ClusteringAPI'


class MetricIterationApp extends Component {
  state = {
    loading: false,
    error: false,
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
    this.setState({ loading: true })
    ClusteringAPI.getParam().then(param => {
      this.setState({ 
        datasets: param.datasets,
        algorithms: param.algorithms,
        scenarios: param.scenarios.iterations,
        loading: false
      }) 
    }).catch(error => (this.showError(error)))
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
    .catch(error => (this.showError(error)))
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
        <Error error={this.state.error}/>
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
            size={{ heigth: 250, width: 'medium' }} //larger, large, medium, small
          />
        )}
        <MultiMetricChartList 
          met_results={this.state.met_results}
          axis={{ x: 'Iterations', y: 'Values' }}
          size={{ heigth: 300, width: 'larger'}} //larger, large, medium, small
          onClickChart = {values => (
            this.createClusterChart(values)
          )}
          />
      </main>
    );
  }
}

export default MetricIterationApp;
