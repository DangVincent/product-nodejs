import React, { Component } from 'react';
import GetEvents from './components/GetEvents';
// import GetStats from './components/GetStats';
// import GetPOI from './components/GetPOI';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>API Data Sample</h1>
                <GetEvents />
                {/* <GetStats />
                <GetPOI /> */}
            </div>
        );
    }
}
