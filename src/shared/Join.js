import React from 'react';
import { Link } from 'react-router-dom'

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyId: NaN, 
      userName: NaN,
    }

    this.handleUserName = this.handleUserName.bind(this);
    this.handleLobbyId = this.handleLobbyId.bind(this);
  }

  handleUserName(event) {
    this.setState({userName: event.target.value});
  }

  handleLobbyId(event) {
    this.setState({lobbyId: event.target.value});
  }

  genLobbyID() {
    // Credit: https://gist.github.com/gordonbrander/2230317
    return Math.random().toString(36).substr(2, 6);
  };

  render() {
    return (
      <div>
          Join a game

          <br/>
          Enter your name
          <input type="text" onChange={this.handleUserName}></input>

          <br/>
          Enter Lobby to join
          <input type="text" onChange={this.handleLobbyId}></input>

          <br/>
          <Link to={'/lobby/' + this.state.lobbyId}>
          Join 
          </Link>
      </div>
    );
  }
}

export default Join;