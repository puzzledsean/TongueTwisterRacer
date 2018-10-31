import React from 'react';
import socketIOClient from "socket.io-client";

const SERVER_ENDPOINT = "http://127.0.0.1:4001" 

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby_id: this.props.match.params.id
    };
  }
  componentDidMount() {
    const socket = socketIOClient(SERVER_ENDPOINT);
  }
  render() {
    return (
      <div>
          Created a game. <br/>
          Share the code with a friend
          Lobby code is {this.state.lobby_id}
      </div>
    );
  }
}

export default Lobby;