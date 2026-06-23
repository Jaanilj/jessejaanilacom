// Cycling multilingual welcome messages, revealed one character at a time with
// the Web Animations API: each letter flips in (rotateX), holds, then dissolves
// out. Degrades to a plain cross-fade when the visitor prefers reduced motion.
const welcomeMessages = [
  'Such dynamicity',
  'Howdy doody!',
  'Hello there.',
  '¡Hola!',
  'Hej, Tjena',
  'Bonjour',
  'Xin chào',
  'Guten Tag',
  'Konnichiwa',
]

const REVEAL = [
  { opacity: 0, transform: 'rotateX(-90deg) translateY(0.2em)' },
  { opacity: 1, transform: 'none' },
]

const DISSOLVE = [
  { opacity: 1, transform: 'none' },
  { opacity: 0, transform: 'rotateX(90deg) translateY(-0.2em)' },
]

const STEP = 60
const DURATION = 650
const EASING = 'cubic-bezier(.3, 1.2, .4, 1)'
const HOLD = 1400

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Replace the element's content with one inline-block span per character
function renderChars(element, text) {
  element.replaceChildren()
  return [...text].map((character) => {
    const span = document.createElement('span')
    span.className = 'char'
    span.textContent = character === ' ' ? ' ' : character
    element.append(span)
    return span
  })
}

// Animate every span with the given keyframes, staggered by STEP per letter
function playStagger(spans, keyframes, reverse = false) {
  const animations = spans.map((span, index) =>
    span.animate(keyframes, {
      duration: DURATION,
      delay: (reverse ? spans.length - 1 - index : index) * STEP,
      easing: EASING,
      fill: 'both',
    })
  )

  return Promise.all(animations.map((animation) => animation.finished))
}

async function runAnimation(element) {
  let index = 0

  for (;;) {
    const message = welcomeMessages[index]
    index = (index + 1) % welcomeMessages.length

    if (reduceMotion.matches) {
      element.textContent = message
      element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'both' })
      await wait(HOLD + 800)
      await element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'both' }).finished
    } else {
      const spans = renderChars(element, message)
      await playStagger(spans, REVEAL)
      await wait(HOLD)
      await playStagger(spans, DISSOLVE, true)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const welcomeMessageElement = document.getElementById('welcomeMessage')
  if (welcomeMessageElement) {
    runAnimation(welcomeMessageElement)
  }
})
