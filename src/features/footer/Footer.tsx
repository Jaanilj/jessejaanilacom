import './Footer.css'

function Footer(): JSX.Element {
  const localeYear = new Date().getFullYear()
  const footerMessage = `Copyright @ ${localeYear} Jesse Jaanila`
  return <footer className="footer">{footerMessage}</footer>
}

export default Footer
