import { BrowserRouter } from "react-router-dom"

import Hero from './components/Hero'
import About from "./components/About"

function App() {

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Hero />
        </div>
        <About />
      </div>
    </BrowserRouter>
  )
}

export default App
