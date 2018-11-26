import React from 'react'
import SpeechRecognition from 'react-speech-recognition'
import styled from 'styled-components'
import { Player } from './Player';

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  font-size: 16px;
`;

const Container = styled.div`
  text-align: center;
  font-family: "Arial", sans-serif;
`

const options = {
  autoStart: false
}

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lobbyId: this.props.match.params.id,
        players: [],
      }
    }
  
    componentDidMount() {
      var passedState = this.props.location.state;
  
      // Update the local lobby with this user.
      this.setState({
          players : passedState.players
      })
    }

    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening } = this.props

        if (!browserSupportsSpeechRecognition) {
            return null
        }
        const userList = this.state.players.map((player) =>
            <li key={player.username}>{player.username}: 0</li>
        );

        let userResponse;
        if(transcript) {
            userResponse = <div>{transcript}</div>
        } else {
            userResponse = <div>...</div>
        }

        return (
            <Container>
            <h1>
            Tongue Twister Racer
            </h1>

            <h2>
                Scoreboard
            </h2>
            <h4>First to 50 points wins!</h4>
            {userList}
            <br/>

            <h3>Prompt</h3>
            She sells seashells by the seashore.

            <h3>Your response</h3>
            {userResponse}

            <br/>
            <Button onClick={() => {resetTranscript(); startListening();}}>Record</Button>
            <br/>
            <Button onClick={stopListening}>Stop Recording and Submit</Button>
            <br/>
        </Container> 
        );
    }
}

export default SpeechRecognition(options)(Game)