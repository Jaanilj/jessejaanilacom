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

// Update the welcome message text
function updateWelcomeMessage(element) {
  element.textContent = state.message
}

// Initialize the state
function initState() {
  const firstMessage = welcomeMessages.shift()
  welcomeMessages.push(firstMessage)

  return {
    addingChars: true,
    targetMessage: welcomeMessages[0],
    message: '',
  }
}

// Animation interval
function startMessageAnimation(element) {
  if (!element) {
    return
  }

  const messageTimeout = 200
  const forwardSearcherRegex = /\S/g
  const backwardSearcherRegex = /\S[ ]*$/

  return setInterval(() => {
    const { message, addingChars, targetMessage } = state

    if (addingChars) {
      const match = forwardSearcherRegex.exec(targetMessage)
      if (match) {
        const nextMessage = targetMessage.substring(0, match.index + 1)
        state.message = nextMessage
        updateWelcomeMessage(element)

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
        updateWelcomeMessage(element)
      } else {
        // Reset and start with next message
        state = initState()
        updateWelcomeMessage(element)
      }
    }
  }, messageTimeout)
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const welcomeMessageElement = document.getElementById('welcomeMessage')
  state = initState()
  startMessageAnimation(welcomeMessageElement)
})
