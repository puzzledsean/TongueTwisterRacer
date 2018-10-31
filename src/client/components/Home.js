import React from 'react';
import { Link } from "react-router-dom";

function createLobby() {
    return '/lobby/' + genLobbyID();
}

function genLobbyID() {
    // Credit: https://gist.github.com/gordonbrander/2230317
    return Math.random().toString(36).substr(2, 6);
};

const Home = () =>
  <div>
    Tongue Twister Racer
    <button><Link to="/join">Join</Link></button>
    <button><Link to={createLobby()}>Create</Link></button>
  </div>

export default Home;