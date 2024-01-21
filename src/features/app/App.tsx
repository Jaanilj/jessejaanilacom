import About from '../about/About'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import './App.css'

function App(): JSX.Element {
  return (
    <main className="app">
      <Header />
      <About />
      <Footer />
    </main>
  )
}

export default App
