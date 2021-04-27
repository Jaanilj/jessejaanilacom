import React, { useState, useEffect } from 'react'
import styles from './Header.module.less'

const forwardSearcher = /\S/g
const backwardSearcher = /\S[ ]*$/

const nextMessage = (() => {
  let messages = [
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

const initState = () => ({
  addingChars: true,
  targetMessage: nextMessage(),
  message: '',
})

function Header(): JSX.Element {
  const [state, setState] = useState(() => initState())

  useEffect(() => {
    const { message, addingChars, targetMessage } = state
    const interval = setInterval(() => {
      if (addingChars) {
        const match = forwardSearcher.exec(targetMessage)
        if (match) {
          return setState({
            ...state,
            message: targetMessage.substring(0, match.index + 1),
          })
        }
        return setState({
          ...state,
          addingChars: false,
        })
      }
      const match = backwardSearcher.exec(message)
      if (match) {
        return setState({
          ...state,
          message: message.substring(0, match.index),
        })
      }
      return setState({
        ...state,
        addingChars: true,
        targetMessage: nextMessage(),
      })
    }, 200)
    return () => clearInterval(interval)
  }, [state])

  return (
    <header className={styles.header}>
      <h1>{state.message}</h1>
    </header>
  )
}

export default Header
