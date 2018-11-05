import React from 'react';
import socketIOClient from "socket.io-client";
const SERVER_ENDPOINT = "http://127.0.0.1:3000" 

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyId: this.props.match.params.id
    }
  }

  componentDidMount() {
    const socket = socketIOClient(SERVER_ENDPOINT);
  }

  render() {
    return (
      <div>
          Share the code with a friend <br/>
          Lobby code is {this.state.lobbyId}
      </div>
    );
  }
}

export default Lobby;