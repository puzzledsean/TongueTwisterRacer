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
      <Container>
          <h1>
            Lobby
          </h1>
          Share the code with a friend 
          <br/>
          Lobby code is <b>{this.state.lobbyId}</b>
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