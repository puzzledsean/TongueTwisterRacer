import React from 'react';
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

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyId: NaN, 
      userName: NaN,
      isCreator: true,
    }

    this.handleUserName = this.handleUserName.bind(this);
  }

  componentDidMount () {
    this.setState(() => ({
      lobbyId: this.genLobbyID() 
    }))
  }

  handleUserName(event) {
    this.setState({userName: event.target.value});
  }

  genLobbyID() {
    // Credit: https://gist.github.com/gordonbrander/2230317
    return Math.random().toString(36).substr(2, 6);
  };

  render() {
    return (
        <Container>
          <h1>
          Create a game
          </h1>
          Enter your name 
          <br/>
          <input type="text" name="userName" onChange={this.handleUserName}></input>

          <br/>
          <Link to={'/'}>
            <Button>
              Back 
            </Button>
          </Link>
          <Link to={
            {
              pathname:'/lobby/' + this.state.lobbyId,
              state: this.state,
            }
           }>
            <Button primary>
              Create
            </Button>
          </Link>
        </Container>
    );
  }
}

export default Create;