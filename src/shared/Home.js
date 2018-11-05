import React from 'react'
import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <div>
      Tongue Twister Racer
      <li>
        <Link to={`/join`}>
          Join a game
        </Link>
      </li>
      <li>
        <Link to={`/create`}>
          Create a game
        </Link>
      </li>
    </div>
  )
}