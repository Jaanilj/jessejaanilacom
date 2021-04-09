import React from 'react'
import styles from '../containers/App.module.less'

export default function About(): JSX.Element {
  const aboutMessage = `I'm a software developer living in Helsinki.
    I'm interest in the outdoors, breakfast, lattès, and Crossfit.
    You can see what i'm doing with my life via`

  const instagramUrl = 'https://www.instagram.com/jaanilajesse/'
  return (
    <section className={styles.centered}>
      <p>
        {aboutMessage}
        <a href={instagramUrl}>@jaanilajesse</a>
      </p>
    </section>
  )
}
