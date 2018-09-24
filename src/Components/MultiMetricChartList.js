import React, { Component } from 'react'
var CanvasJSReact = require('../utils/canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class MultiMetricChartList extends Component {
    generateOptions(metric) {
        console.log(metric)
        let points = metric.values.map((itr) => (
            {
                type: "line",
                toolTipContent: "Iteration: {x}<br>Value: {y}",
                dataPoints: itr.map((value, idx) => (
                    { x: idx, y: value }
                ))
            }
            
        ))
        return {
            animationEnabled: true,
            exportEnabled: true,
            exportFileName: `${metric.name}Chart`,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
                text: metric.name
            },
            axisY: {
                title: "Values",
                includeZero: false,
                // suffix: "%"
            },
            axisX: {
                title: "Iterations",
                // prefix: "W",
                interval: 1
            },
            height: 300,
            data: points
        }
    }
    render() {
        const { met_results } = this.props;
        return (
            <section className='list-chart-container'>
                {met_results.map(metric => (
                    <div className='chart-container' key={metric.name}>
                        <CanvasJSChart
                            options={this.generateOptions(metric)}
                        />
                    </div>
                ))}

            </section>)
    }
}

export default MultiMetricChartList;
