const api = 'http://localhost:5000'

export const getMetricIterations = (dataset, algorithm, k) =>     
    fetch(`${api}/metrics_iterations/${dataset}/${algorithm}/${k}`)
        .then(res => res.json())

export const getMultiMetricIterations = (dataset, algorithm, k, n_sim) =>
    fetch(`${api}/multi_metrics_iterations/${dataset}/${algorithm}/${k}/${n_sim}`)
        .then(res => res.json())

export const getCustomDS = (ds, algorithm, k) =>     
    fetch(`${api}/metrics_customds/${ds}/${algorithm}/${k}`)
        .then(res => res.json())

export const getParam = () =>     
    fetch(`${api}/param`)
        .then(res => res.json())



