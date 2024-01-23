import { useState, useEffect } from 'react'
import './Header.css'

const forwardSearcherRegex = /\S/g
const backwardSearcherRegex = /\S[ ]*$/
const messageTimeout = 200

type WelcomeMessages = [string, ...string[]] | [...string[], string]

const nextMessage = (() => {
  let messages: WelcomeMessages = [
    'Such dynamicity',
    'Howdy doody!',
    'Hello there.',
    '¡Hola!',
    'Hej, Tjena',
    'Bonjour',
    'Xin chào',
    'Guten Tag',
    'Konnichiwa',
  ]

  return () => {
    const [first, ...rest] = messages
    messages = [...rest, first]
    return messages[0]
  }
})()

const initState = () => ({ addingChars: true, targetMessage: nextMessage(), message: '' })

function Header(): JSX.Element {
  const [state, setState] = useState(initState)

  useEffect(() => {
    const { message, addingChars, targetMessage } = state

    const interval = setInterval(() => {
      if (addingChars) {
        const match = forwardSearcherRegex.exec(targetMessage)
        if (match) {
          const nextMessage = targetMessage.substring(0, match.index + 1)
          return setState({ ...state, message: nextMessage })
        }
        return setState({ ...state, addingChars: false })
      }
      const match = backwardSearcherRegex.exec(message)
      if (match) {
        const nextMessage = message.substring(0, match.index)
        return setState({ ...state, message: nextMessage })
      }
      return setState({ ...state, addingChars: true, targetMessage: nextMessage() })
    }, messageTimeout)

    return () => clearInterval(interval)
  }, [state])

  return (
    <header className="header">
      <h1>{state.message}</h1>
    </header>
  )
}

export default Header
