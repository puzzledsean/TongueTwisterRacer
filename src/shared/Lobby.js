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
      userNames: [],
      isCreator: false,
    }
  }

  componentDidMount() {
    var passedState = this.props.location.state;

    // Update the local lobby with this user.
    this.setState({
        userNames: this.state.userNames.concat(passedState.userName),
        isCreator: passedState.isCreator,
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
        fetch(SERVER_ENDPOINT + '/api/updateLobby', {
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
            socket.emit('lobbyUpdateToServer', data);
          })
        })
      }
    })

    // Update the lobby
    socket.on('lobbyUpdateToClient', (data) => {
      this.setState({
        userNames: data.userNames,
      })
    })
  }

  render() {
    const userList = this.state.userNames.map((userName) =>
        <li key={userName}>{userName}</li>
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
            <Button>
              Leave Game 
            </Button>
          </Link>
          <Link to={'/game/' + this.state.lobbyId}>
            <Button primary>
              Start Game 
            </Button>
          </Link>
      </Container>
    );
  }
}

export default Lobby;