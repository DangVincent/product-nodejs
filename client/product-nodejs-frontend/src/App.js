import React, { Component } from 'react';
import GetEvents from './components/GetEvents';
import GetPOI from './components/GetPOI';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <h1>API Data Sample</h1>
                </header>
                <main>
                    <GetEvents />
                    <GetPOI />
                </main>
                <footer>
                    <p>Copyright Vincent Dang</p>
                </footer>
            </div>
        );
    }
}
