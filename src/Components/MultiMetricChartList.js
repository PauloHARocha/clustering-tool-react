import React, { Component } from 'react'
var CanvasJSReact = require('../utils/canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class MultiMetricChartList extends Component {
    generateOptions(metric, axis, height) {
        let onClick = this.props.onClickChart;
        let points = metric.values.map((sim, sim_idx) => (
            {
                type: "line",
                name: sim_idx.toString(),
                toolTipContent: "Simulation: {name}<br>Iteration: {x}<br>Value: {y}",
                dataPoints: sim.map((itr, itr_idx) => (
                    { x: itr_idx, y: itr, click: e => (onClick({
                                                        n_sim: sim_idx,
                                                        itr: e.dataPoint.x,})),})),   
            }))
        return {
            animationEnabled: true,
            exportEnabled: true,
            exportFileName: `${metric.name}Chart`,
            zoomEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
                text: metric.name
            },
            axisY: {
                title: axis.y,
                includeZero: false,
                // suffix: "%"
            },
            axisX: {
                title: axis.x,
                // prefix: "W",
                interval: 1
            },
            height: height,
            data: points
        }
    }
    render() {
        const { met_results, axis, size } = this.props;
        return (
            <section className='list-chart-container'>
                {met_results.map(metric => (
                    <div className={`chart-container-${size.width}`} key={metric.name}>
                        <CanvasJSChart
                            options={this.generateOptions(metric, axis, size.height)}
                        />
                    </div>
                ))}

            </section>)
    }
}

export default MultiMetricChartList;
