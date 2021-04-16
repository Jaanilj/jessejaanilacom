import React, { useState, useEffect } from 'react'
import styles from './Header.module.less'

const searcherRegExp = () => new RegExp('\\S', 'g')

const nextMessage = (() => {
  const messages = [
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

  function rotate<T>(items: T[]): T[] {
    const first = items.shift()
    if (first) {
      items.push(first)
    }
    return items
  }

  return () => rotate(messages)[0]
})()

const initState = () => ({
  addingChars: true,
  targetMessage: nextMessage(),
  message: '',
  searcher: searcherRegExp(),
})

export default function Header(): JSX.Element {
  const [state, setState] = useState(() => initState())

  useEffect(() => {
    const { message, addingChars, targetMessage } = state
    const interval = setInterval(() => {
      if (addingChars && message.length === targetMessage.length) {
        return setState({
          ...state,
          addingChars: false,
        })
      }
      if (addingChars) {
        state.searcher.exec(targetMessage)
        return setState({
          ...state,
          message: targetMessage.substring(0, state.searcher.lastIndex),
        })
      }
      if (!addingChars && message.length === 0) {
        return setState({
          ...state,
          addingChars: true,
          targetMessage: nextMessage(),
          searcher: searcherRegExp(),
        })
      }
      const match = /\S[ ]*$/.exec(message)
      return setState({
        ...state,
        message: message.substring(0, match?.index ?? 0),
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
