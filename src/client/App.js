import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Tongue Twist Racer
      </div>
    );
  }
}
