import React from 'react'

function About(): JSX.Element {
  const relexUrl = 'https://www.relexsolutions.com/'
  const instagramUrl = 'https://www.instagram.com/jaanilajesse/'
  const linkedInUrl = 'https://www.linkedin.com/in/jessejaanila/'
  return (
    <section>
      <p>
        I&apos;m a pragmatic and solution-oriented software developer working
        besides the beautiful people at <a href={relexUrl}>RELEX Solutions</a>.
        Outside of the programming world, I&apos;m probably enjoying the
        outdoors, testing breakfast restaurants, enjoying oat-milk lattès or
        doing Crossfit®.
      </p>
      <p>
        If you&apos;re interested, you can find my socials at{' '}
        <a href={instagramUrl}>Instagram</a> and at{' '}
        <a href={linkedInUrl}>Linkedin</a>. Oh, and I&apos;m based in Helsinki.
      </p>
    </section>
  )
}

export default About
