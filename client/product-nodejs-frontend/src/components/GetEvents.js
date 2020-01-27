import React, { Component } from 'react';
import axios from 'axios';
import EventsChart from './EventsChart';

export default class GetEvents extends Component {

    constructor() {
        super();
        this.state = {
            eventsData: '',
            isLoading: true
        };
    }

    componentDidMount() {
        this.getAPIData('events/hourly');
    }

    getAPIData = (url) => {
        axios({
            method:'GET',
            url: `http://localhost:5555/${url}`,
            dataResponse: 'json',
        })
        .then((res) => {
            const {data} = res;
            this.setState({
                eventsData: data,
                isLoading: false
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        const {
            getAPIData,
            state: {
                eventsData,
                isLoading
            },
        } = this;

        return (
            <div>
                { isLoading ? null : <EventsChart chartData={eventsData} /> }
                <button onClick={() => getAPIData('events/hourly')}>
                    Hourly
                </button>
                <button onClick={() => getAPIData('events/daily')}>
                    Daily
                </button>
            </div>
        );
    }
};
