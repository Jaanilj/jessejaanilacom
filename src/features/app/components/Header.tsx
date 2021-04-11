import React, { useState, useEffect } from 'react'
import styles from './Header.module.less'

const searcherRegExp = () => new RegExp('\\S', 'g')

const nextMessage = (() => {
  const messages = [
    'Such dynamicity',
    'Howdy doody!',
    'Hello there.',
    '¡Hola!',
    'Hej Tjena',
    'Shalom',
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
    const interval = setInterval(() => {
      if (
        state.addingChars &&
        state.message.length === state.targetMessage.length
      ) {
        setState({
          ...state,
          addingChars: false,
        })
      } else if (state.addingChars) {
        state.searcher.exec(state.targetMessage)
        setState({
          ...state,
          message: state.targetMessage.substring(0, state.searcher.lastIndex),
        })
      } else if (!state.addingChars && state.message.length === 0) {
        setState({
          ...state,
          addingChars: true,
          targetMessage: nextMessage(),
          searcher: searcherRegExp(),
        })
      } else {
        setState({
          ...state,
          message: state.message.substring(0, state.message.length - 1),
        })
      }
    }, 220)
    return () => clearInterval(interval)
  }, [state])

  return (
    <header className={styles.header}>
      <h1 className={styles.header_message}>{state.message}</h1>
    </header>
  )
}
