import './styles.css'

// Cycling multilingual welcome messages, revealed one character at a time with
// the Web Animations API: each letter flips in (rotateX) through a blur, holds,
// then dissolves out. Degrades to a plain cross-fade when the visitor prefers
// reduced motion.
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

const EASING = 'cubic-bezier(.3, 1.2, .4, 1)'
const HOLD = 1400
const BLUR = '8px'

// Reveal pacing is 15% faster than the original 650ms / 60ms; dissolve runs a
// further 20% faster than the reveal. `fill: 'backwards'` lets each letter fall
// back to its plain styled state once revealed, so the heading's blend-mode
// gradient shows through during the hold — a lingering transform or filter
// would give the letter its own stacking context and hide the gradient.
const REVEAL = {
  keyframes: [
    { opacity: 0, filter: `blur(${BLUR})`, transform: 'rotateX(-90deg) translateY(0.2em)' },
    { opacity: 1, filter: 'blur(0)', transform: 'none' },
  ],
  duration: 553,
  step: 51,
  fill: 'backwards',
}

const DISSOLVE = {
  keyframes: [
    { opacity: 1, filter: 'blur(0)', transform: 'none' },
    { opacity: 0, filter: `blur(${BLUR})`, transform: 'rotateX(90deg) translateY(-0.2em)' },
  ],
  duration: 442,
  step: 41,
  fill: 'forwards',
  reverse: true,
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Replace the element's content with one inline-block span per visible
// character; spaces stay plain text nodes so word gaps render normally.
function renderChars(element, text) {
  element.replaceChildren()
  const spans = []

  for (const character of text) {
    if (character === ' ') {
      element.append(' ')
      continue
    }

    const span = document.createElement('span')
    span.className = 'char'
    span.textContent = character
    element.append(span)
    spans.push(span)
  }

  return spans
}

// Animate every span with the given phase, staggered per letter
function playStagger(spans, { keyframes, duration, step, fill, reverse = false }) {
  const animations = spans.map((span, index) =>
    span.animate(keyframes, {
      duration,
      delay: (reverse ? spans.length - 1 - index : index) * step,
      easing: EASING,
      fill,
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
      await playStagger(spans, DISSOLVE)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const welcomeMessageElement = document.getElementById('welcomeMessage')
  if (welcomeMessageElement) {
    runAnimation(welcomeMessageElement)
  }
})
