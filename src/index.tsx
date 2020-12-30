import React from 'react'
import { render } from 'react-dom'
import App from './features/app/containers/App'

require('../css/common-styles.less')

render(<App />, document.getElementById('app'))
