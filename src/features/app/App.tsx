import React from 'react'
import About from '../about/About'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import styles from './App.module.less'

function App(): JSX.Element {
  return (
    <main className={styles.container}>
      <Header />
      <About />
      <Footer />
    </main>
  )
}

export default App
