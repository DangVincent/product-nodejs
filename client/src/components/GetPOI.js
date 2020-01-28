import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import DataTable from './DataTable';

export default class GetPOI extends Component {

    constructor() {
        super();
        this.state = {
            poiData: '',
            isLoading: true
        };
    }

    // Make axios request to API and retrieve the data
    componentDidMount() {
        axios({
            method:'GET',
            url: `poi`,
            dataResponse: 'json',
        })
        .then((res) => {
            const {data} = res;
            this.setState({
                poiData: data,
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
            poiData,
            isLoading
        } = this.state;

        return (
            <section className={"poi"}>
                { isLoading ? null : <DataTable dataTableData={poiData} />}
            </section>
        );
    }
};
