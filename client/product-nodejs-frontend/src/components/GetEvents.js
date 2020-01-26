import React, { Component } from 'react';
import axios from 'axios';

export default class GetEvents extends Component {

    constructor() {
        super();
        this.state = {
            data: ''
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
            this.setState({
                data: res.data
            }, function() {
                console.log(this.state.data[0])
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        const {
            getAPIData,
        } = this;

        return (
            <div>
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
