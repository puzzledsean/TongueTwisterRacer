import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

export default function Home () {
  return (
    <Container>
      <h1>
      Tongue Twister Racer
      </h1>
        <Link to={`/create`}>
          <Button>
            Create a game
          </Button>
        </Link>
        <Link to={`/join`}>
          <Button>
            Join a game
          </Button>
        </Link>
    </Container>
  )
}