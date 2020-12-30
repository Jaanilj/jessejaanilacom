import React from 'react'
import Greeting from '../components/Greeting'
import styles from './App.module.less'

export default function App() {
  return (
    <div className={styles.container}>
      <Greeting />
    </div>
  )
}
