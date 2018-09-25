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

class ClusterChartIteration extends Component {
    generateOptions(centroids, clusters, itr, d_idxs, n_sim) {
        let centroidPoints = centroids[itr].map(c => (
            { x: c.values[d_idxs.x], y: c.values[d_idxs.y] }
        ))
        let clusterPoints = clusters[itr].map(c => (
            c.values.map(data => (
                { x: data[d_idxs.x], y: data[d_idxs.y] }
            ))
        ))
        let data_centroid = {
            type: "scatter",
            color: 'black',
            toolTipContent: "x: {x}<br>y: {y}",
            markerType: 'cross',
            markerSize: 9,
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
                markerSize: 4,
                name: `${cluster_size}`,
                color: colors[parseInt(idx)],
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
                text: `Sim: ${n_sim} - Itr: ${itr}`//centroid.name
            },
            axisY: {
                title: "Y",
                includeZero: false,
                maximum: 1,
                minimum: 0,
                // suffix: "%"
            },
            axisX: {
                title: "X",
                // prefix: "W",
                maximum: 1,
                minimum: 0,
            },
            height: 250,
            data: data
        }
    }
    getDimensionsIdxs = (d_length) =>{
        let idxs = [];
        for (let x = 0; x < d_length; x++) {
            for (let y = 0; y < d_length; y++) {
                if (x < y) {
                    idxs.push({x: x, y: y});
                }
            }
        }
        return idxs;
    }
    render() {
        const { centroids, clusters, itr, n_sim } = this.props;
        const dimensions_idx = this.getDimensionsIdxs(centroids[itr][0].values.length);
        return (
            <section className='list-chart-container'>
                {dimensions_idx.map((d_idxs, idx) => (
                    <div className='chart-container-medium' key={idx}>
                        <CanvasJSChart
                            options={this.generateOptions(centroids, clusters, itr, d_idxs, n_sim)}
                        />
                    </div>
                ))}
            </section>
            )
    }
}

export default ClusterChartIteration;
