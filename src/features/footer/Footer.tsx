import React from 'react'
import styles from './Footer.module.less'

function Footer(): JSX.Element {
  const localeYear = new Date().getFullYear()
  const footerMessage = `Copyright @ ${localeYear} Jesse Jaanila`
  return <footer className={styles.footer}>{footerMessage}</footer>
}

export default Footer
