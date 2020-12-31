import React from 'react'
import styles from './Greeting.module.less'

const instagramUrl = 'https://www.instagram.com/jaanilajesse/'

export default function Greeting() {
  return (
    <>
      <h1>Welcome to my webpage!</h1>
      <p className={styles.message}>
        I'm a software developer living in Helsinki. I'm interest in the
        outdoors, breakfast, lattès, and Crossfit. You can see what i'm doing
        with my life via <a href={instagramUrl}>@jaanilajesse</a>.
      </p>
    </>
  )
}
