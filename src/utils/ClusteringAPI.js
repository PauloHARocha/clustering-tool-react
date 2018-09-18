const api = 'http://localhost:5000'

export const getMetricIterations = (dataset, algorithm, k) =>     
    fetch(`${api}/metrics_iterations/${dataset}/${algorithm}/${k}`)
        .then(res => res.json())

export const getCustomDS = (algorithm, k) =>     
    fetch(`${api}/metrics_customds/${algorithm}/${k}`)
        .then(res => res.json())

export const getParam = () =>     
    fetch(`${api}/param`)
        .then(res => res.json())



