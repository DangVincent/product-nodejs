import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


export default class EventsChart extends Component {

    constructor() {
        super();
        this.state = {
            dates: [],
            hours: [],
            events: [],
            chartTitle: ''
        };
    }

    componentDidMount() {
        this.getChartData();
    }

    getChartData() {
        const { chartData } = this.props;
        let dates = [];
        let hours = [];
        let events = [];

        chartData.forEach(item => {
            if (item.hour) {
                hours.push(item.hour);
                this.setState({
                    hours: hours,
                    chartTitle: 'Hourly Events'
                });
            }
            else {
                this.setState({
                    chartTitle: 'Daily Events'
                });
            }

            dates.push(item.date);
            events.push(item.events);
            
            this.setState({
                dates: dates,
                events: events, 
            });
        });

    }

    componentDidUpdate(prevProps) {
        if(this.props.chartData !== prevProps.chartData) { 
            this.getChartData();
        }
    }

    render() {
        const { 
            props: {
                chartData,
            },
            state: {
                dates,
                events,
                chartTitle
            } 
        } = this;

        return (
            <div>
                {chartData 
                ?  <Line 
                        data={{
                            labels: dates,
                            datasets: [{
                                label: chartTitle,
                                backgroundColor: 'rgba(255, 255, 255, 0)',
                                borderColor: 'rgb(0, 0, 0)',
                                pointBackgroundColor: 'black',
                                data: events,
                            }]
                        }}
                        options={{
                            maintainAspectRatio: true,
                            responsive: true,
                            title: {
                                text: 'Events Chart',
                                display: true,
                                fontSize: 25,
                                fontColor: 'black'
                            },
                            scales: {
                                xAxes: [{
                                    scaleLabel: {
                                        labelString: 'Dates',
                                        display: true,
                                        fontSize: 20,
                                        fontColor: 'black'
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        labelString: '# of Events',
                                        display: true,
                                        fontSize: 20,
                                        fontColor: 'black'
                                    }
                                }]
                            }
                        }}
                    />
                : null
                }
            </div>
        );
    }
};
