import './styles.css'

// Cycling multilingual welcome messages, revealed one character at a time with
// the Web Animations API: each greeting's letters blur in on a staggered
// left-to-right wave, hold, then blur back out. Degrades to a plain cross-fade
// when the visitor prefers reduced motion.
const welcomeMessages = [
  'Howdy doody!',
  'Hello there.',
  '¡Hola!',
  'Hej, Tjena!',
  'Bonjour!',
  'Xin chào!',
  'Guten Tag!',
  'Konnichiwa!',
]

const HOLD = 1400
const BLUR = '10px'

// Each greeting's letters resolve out of a dim, squeezed blur to crisp on a
// staggered left-to-right wave (ease-out), hold, then blur back out the same way
// (ease-in) — a per-letter "refresh" that sweeps across the word, modelled on
// staggered-text_2.mp4. `fill` pins each letter to its start/end state outside
// its own slice so the wave reads cleanly.
const REVEAL = {
  keyframes: [
    { opacity: 0, filter: `blur(${BLUR})`, transform: 'scaleX(0.86)' },
    { opacity: 1, filter: 'blur(0)', transform: 'none' },
  ],
  duration: 500,
  step: 55,
  easing: 'cubic-bezier(.22, 1, .36, 1)',
  fill: 'backwards',
}

const DISSOLVE = {
  keyframes: [
    { opacity: 1, filter: 'blur(0)', transform: 'none' },
    { opacity: 0, filter: `blur(${BLUR})`, transform: 'scaleX(0.86)' },
  ],
  duration: 420,
  step: 50,
  easing: 'cubic-bezier(.55, 0, 1, .45)',
  fill: 'forwards',
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

// Each .char clips a gradient to its own glyph (so the colour flips with the
// letter). Size and offset every letter's gradient to the whole heading box so
// together they read as one continuous gradient instead of one per letter.
function paintGradient(element, spans) {
  const word = element.getBoundingClientRect()
  for (const span of spans) {
    const box = span.getBoundingClientRect()
    span.style.backgroundSize = `${word.width}px ${word.height}px`
    span.style.backgroundPosition = `${word.left - box.left}px ${word.top - box.top}px`
  }
}

// Animate every span with the given phase, staggered per letter
function playStagger(spans, { keyframes, duration, step, easing, fill, reverse = false }) {
  const animations = spans.map((span, index) =>
    span.animate(keyframes, {
      duration,
      delay: (reverse ? spans.length - 1 - index : index) * step,
      easing,
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

    const spans = renderChars(element, message)
    paintGradient(element, spans)

    if (reduceMotion.matches) {
      element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'both' })
      await wait(HOLD + 800)
      await element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'both' }).finished
    } else {
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
