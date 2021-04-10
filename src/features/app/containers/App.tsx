import React from 'react'
import About from '../components/About'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from './App.module.less'

export default function App(): JSX.Element {
  return (
    <main className={styles.container}>
      <Header />
      <About />
      <Footer />
    </main>
  )
}
