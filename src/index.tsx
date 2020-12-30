import React from 'react'
import { render } from 'react-dom'

function Greeting() {
  return <h1>Welcome to my webpage</h1>
}

render(<Greeting />, document.getElementById('app'))
