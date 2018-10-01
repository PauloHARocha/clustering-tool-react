import React, { Component } from 'react'
var CanvasJSReact = require('../utils/canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const colors = ["green", "red", "blue", "yellow", "purple",
    "orange", "brown", "pink", "gray", "cyan",
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

class ClusterChartList extends Component {
    generateOptions(centroids, clusters, ds_name) {
        let centroidPoints = centroids.map( c => (
            { x: c.values[0], y: c.values[1]}
        ))
        let clusterPoints = clusters.map( c => (
            c.values.map(data => (
                { x: data[0], y: data[1]}
            ))
        ))
        let data_centroid = {   
                type: "scatter",
                color: 'black',
                toolTipContent: "x: {x}<br>y: {y}",
                markerType: 'cross', 
                markerSize: 4,
                dataPoints: centroidPoints
            }
        
        let data = [];
        clusterPoints.forEach((cp, idx) => {
            let cluster_size = Object.keys(cp);
            cluster_size = cluster_size.length;
            
            data.push({
                type: "scatter",
                toolTipContent: "x: {x}<br>y: {y}",
                markerType: 'circle',
                markerSize: 2,
                color: colors[parseInt(idx, 10)], 
                name: `${cluster_size}`,
                showInLegend: true,
                dataPoints: cp
            })
        })
        // console.log();
        data.push(data_centroid);
        // data.push(data_cluster);
        return {
            animationEnabled: true,
            zoomEnabled: true,
            // exportEnabled: true,
            // exportFileName: 'chart',//`${centroid.name}Chart`,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
                text: `${ds_name}`//centroid.name
            },
            axisY: {
                title: "Y",
                includeZero: false,
                maximum: 1,
                minimum: -1,
                // suffix: "%"
            },
            axisX: {
                title: "X",
                // prefix: "W",
                maximum: 1,
                minimum: -1,
            },
            height: 150,
            data: data
        }
    }
    render() {
        const { ds_results, sim } = this.props;
        return (
            <section className='list-chart-container'>
                {ds_results.map( ds => (
                    <div className='chart-container-small' key={ds.name}>
                        <CanvasJSChart
                            options={this.generateOptions(ds.centroids[sim], ds.clusters[sim], ds.name)}
                        />
                    </div>
                ))}
                {/* {centroids.map(metric => (
                    
                ))} */}

            </section>)
    }
}

export default ClusterChartList;
