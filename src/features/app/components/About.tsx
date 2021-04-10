import React from 'react'
import styles from '../containers/App.module.less'

export default function About(): JSX.Element {
  const instagramUrl = 'https://www.instagram.com/jaanilajesse/'
  const linkedInUrl = 'https://www.linkedin.com/in/jessejaanila/'
  return (
    <section className={styles.centered}>
      <p>
        {`I'm a pragmatic software developer living in Helsinki. Outside of
        programming-world, I'm probably enjoying the outdoors, testing breakfast
        restaurants, enjoying oat-milk lattès or doing Crossfit®.`}
      </p>
      <p>
        {'Find me on '}
        <a href={instagramUrl}>instagram</a>
        {', '}
        <a href={linkedInUrl}>linkedIn</a>
        {' and on few Discord servers answering programming questions.'}
      </p>
    </section>
  )
}
