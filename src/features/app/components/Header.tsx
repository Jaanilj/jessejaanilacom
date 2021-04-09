import React from 'react'
import appStyles from '../containers/App.module.less'
import headerStyles from './Header.module.less'

export default function Header(): JSX.Element {
  const greetingTitle = 'Howdy-doody!'
  const classNames = [appStyles.centered, headerStyles.header].join(' ')
  return (
    <header className={classNames}>
      <h1>{greetingTitle}</h1>
    </header>
  )
}
