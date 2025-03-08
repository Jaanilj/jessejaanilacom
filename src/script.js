// Welcome messages array
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

// State management
let state = {
  addingChars: true,
  targetMessage: '',
  message: '',
}

// Constants
const messageTimeout = 200
const forwardSearcherRegex = /\S/g
const backwardSearcherRegex = /\S[ ]*$/

// DOM elements
const welcomeMessageElement = document.getElementById('welcomeMessage')

// Initialize the state
function initState() {
  // Rotate the messages array (take first element and put it at the end)
  const firstMessage = welcomeMessages.shift()
  welcomeMessages.push(firstMessage)

  return {
    addingChars: true,
    targetMessage: welcomeMessages[0],
    message: '',
  }
}

// Update the welcome message text
function updateWelcomeMessage() {
  if (welcomeMessageElement) {
    welcomeMessageElement.textContent = state.message
  }
}

// Animation interval
function startMessageAnimation() {
  return setInterval(() => {
    const { message, addingChars, targetMessage } = state

    if (addingChars) {
      const match = forwardSearcherRegex.exec(targetMessage)
      if (match) {
        const nextMessage = targetMessage.substring(0, match.index + 1)
        state.message = nextMessage
        updateWelcomeMessage()

        // Reset regex lastIndex
        forwardSearcherRegex.lastIndex = match.index + 1
      } else {
        state.addingChars = false
        forwardSearcherRegex.lastIndex = 0
      }
    } else {
      const match = backwardSearcherRegex.exec(message)
      if (match) {
        const nextMessage = message.substring(0, match.index)
        state.message = nextMessage
        updateWelcomeMessage()
      } else {
        // Reset and start with next message
        state = initState()
        updateWelcomeMessage()
      }
    }
  }, messageTimeout)
}

// Initialize the application
function init() {
  // Set initial state with first message
  state = initState()
  // Start the message animation
  startMessageAnimation()
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init)
