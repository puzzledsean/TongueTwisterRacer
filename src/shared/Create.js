import React from 'react';
import { Link } from 'react-router-dom'

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyId: NaN, 
      userName: NaN,
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
      <div>
          Create a game

          <br/>
          Enter your name
          <input type="text" name="userName" onChange={this.handleUserName}></input>

          <br/>
          <Link to={'/lobby/' + this.state.lobbyId}>
          Create 
          </Link>
      </div>
    );
  }
}

export default Create;