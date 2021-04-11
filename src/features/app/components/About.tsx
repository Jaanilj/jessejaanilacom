import React from 'react'

export default function About(): JSX.Element {
  const relexUrl = 'https://www.relexsolutions.com/'
  const instagramUrl = 'https://www.instagram.com/jaanilajesse/'
  const linkedInUrl = 'https://www.linkedin.com/in/jessejaanila/'
  return (
    <section>
      <p>
        I&apos;m a pragmatic and solution-oriented software developer working
        beside the beautiful people at <a href={relexUrl}>RELEX</a>. Outside of
        the programming world, I&apos;m probably enjoying the outdoors, testing
        breakfast restaurants, enjoying oat-milk lattès or doing Crossfit®.
      </p>
      <p>
        If you&apos;re interested, you can find my socials on the web at{' '}
        <a href={instagramUrl}>Instagram</a> and at{' '}
        <a href={linkedInUrl}>Linkedin</a> or in the concrete world in Helsinki.
      </p>
    </section>
  )
}
