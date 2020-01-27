import React, { Component } from 'react';
import axios from 'axios';
import EventsChart from './EventsChart';
import Swal from 'sweetalert2'

export default class GetEvents extends Component {

    constructor() {
        super();
        this.state = {
            eventsData: '',
            isLoading: true
        };
    }

    componentDidMount() {
        this.getEventsData('events/hourly');
    }

    getEventsData = (url) => {
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
        .catch(() => {
            Swal.fire(
                'Error', 
                'You have made too many requests, please wait a minute!', 
                'error'
            );
        });
    }

    render() {
        const {
            getEventsData,
            state: {
                eventsData,
                isLoading
            },
        } = this;

        return (
            <section className={"events"}>
                { isLoading ? null : <EventsChart chartData={eventsData} /> }
                <button onClick={() => getEventsData('events/hourly')}>
                    Hourly
                </button>
                <button onClick={() => getEventsData('events/daily')}>
                    Daily
                </button>
            </section>
        );
    }
};
