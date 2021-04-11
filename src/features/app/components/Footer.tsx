import React from 'react'
import styles from './Footer.module.less'

export default function Footer(): JSX.Element {
  const localeYear = new Date().getFullYear().toString()
  const footerMessage = `Copyright @ ${localeYear} Jesse Jaanila`
  return <footer className={styles.footer}>{footerMessage}</footer>
}
