import React from 'react';
import socketIOClient from "socket.io-client";
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  font-size: 16px;
`;

const Container = styled.div`
  text-align: center;
  font-family: "Arial", sans-serif;
`

const SERVER_ENDPOINT = "http://127.0.0.1:3000" 
// Establish a socket connection
const socket = socketIOClient(SERVER_ENDPOINT);

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyId: this.props.match.params.id,
      players: [],
      isCreator: false,
      currentPlayerId: "",
    }
    this.leaveGame = this.leaveGame.bind(this);
  }

  componentDidMount() {
    var passedState = this.props.location.state;
    var currentPlayer = passedState.currentPlayer;

    // Generate session for Player's UID 
    var generatedPlayerId = this.genPlayerId();
    currentPlayer.setUID(generatedPlayerId);

    // Update the local lobby with this user.
    this.setState({
        players: this.state.players.concat(currentPlayer),
        isCreator: passedState.isCreator,
        currPlayerId: generatedPlayerId,
    }, () => {
      // Either create a new lobby in db or update the lobby in db.
      if(this.state.isCreator) {
        fetch(SERVER_ENDPOINT + '/api/createLobby', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'state': this.state,
          })
        })
      } else {
        fetch(SERVER_ENDPOINT + '/api/joinLobby', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'state': this.state,
          })
        }).then(response => {
          response.json().then(data => {
            socket.emit('lobbyJoinServer', data);
          })
        })
      }
    })

    // Update join lobby action
    socket.on('lobbyJoinClient', (data) => {
      this.setState({
        players: data.players,
      })
    })

    // Update leave lobby action
    socket.on('lobbyLeaveClient', (data) => {
      this.setState({
        players: data.players,
      })
    })

    // Redirect to the game if someone started. 
    socket.on('startGameClient', () => {
      this.props.history.push({
        pathname: '/game/' + this.state.lobbyId,
        state: this.state,
      })
    })
  }

  startGame() {
    socket.emit('startGameServer', {})
  }

  leaveGame() {
    fetch(SERVER_ENDPOINT + '/api/leaveLobby', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'state': this.state,
      })
    }).then(response => {
      response.json().then(data => {
        socket.emit('lobbyLeaveServer', data);
      })
    })
  }

  // Generate a player ID/UID for the user.
  genPlayerId() {
    // Credit: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4();
  }

  render() {
    const userList = this.state.players.map((player) =>
        <li key={player.username}>{player.username}</li>
    );
    return (
      <Container>
          <h1>
            Lobby
          </h1>
          Share the code with a friend 
          <br/>
          Lobby code is <b>{this.state.lobbyId}</b>
          <br/>
          <br/>
          <h2>
            Players:  
          </h2>
          {userList}
          <br/>

          <Link to={'/'}>
            <Button onClick={this.leaveGame}>
              Leave Game 
            </Button>
          </Link>
          <Link to={
            {
              pathname: '/game/' + this.state.lobbyId,
              state: this.state,
            }
          }>
            <Button primary onClick={this.startGame}>
              Start Game 
            </Button>
          </Link>
      </Container>
    );
  }
}

export default Lobby;