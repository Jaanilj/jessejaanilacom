import React from 'react'
import styles from './Greeting.module.less'

export default function Greeting() {
  return (
    <>
      <h1>Welcome to my webpage!</h1>
      <span className={styles.message}>
        Please play a game of chess against me while your here.
      </span>
    </>
  )
}
