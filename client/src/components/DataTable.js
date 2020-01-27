import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import Fuse from 'fuse.js';
import 'react-table-6/react-table.css';

export default class DataTable extends Component {

    constructor() {
        super();
        this.state = {
            userInput: '',
            filteredData: []
        };
    }

    handleChange = (e) => {
        this.setState({
            userInput: e.target.value
        });
        this.handleFuzzySearch(e.target.value);
    }

    handleFuzzySearch = (searchInput) => {
        const {
            dataTableData
        } = this.props;

        const options = {
            keys: ['name'],
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 0,
            maxPatternLength: 32,
            minMatchCharLength: 1,
        };

        const fuse = new Fuse(dataTableData, options);
        const filteredResult = fuse.search(searchInput);

        this.setState({
            filteredData: filteredResult
        });
    }

    render() {
        const {
            handleChange,
            state: {
                userInput,
                filteredData
            },
            props: {
                dataTableData
            }
        } = this;

        const columns = [{
            Header: 'POI ID',
            accessor: 'poi_id',
        },  {
            Header: 'Name',
            accessor: 'name'
        },  {
            Header: 'Latitude',
            accessor: 'lat'
        },  {
            Header: 'Longitude',
            accessor: 'lon'
        }];

        return (
            <div className={"dataTable"}>
                <h2>POI Data Table</h2>
                <label htmlFor="searchPOI">Enter a POI name: </label>
                <input type="text" className={"searchInput"} onChange={handleChange} placeholder={"Enter a POI name"}/>
                <ReactTable
                    data={userInput ? filteredData : dataTableData}
                    columns={columns}
                    minRows={4}
                    showPagination={false}
                />
            </div>
        );
    };
};
