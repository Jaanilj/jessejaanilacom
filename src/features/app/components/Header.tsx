import React from 'react'
import styles from './centered.module.less'

export default function Header(): JSX.Element {
  const greetingTitle = 'Howdy-doody!'
  return (
    <header className={styles.centered}>
      <h1>{greetingTitle}</h1>
    </header>
  )
}
