import { BrowserRouter } from "react-router-dom"

import Hero from './components/Hero'
import About from "./components/About"
import Tech from "./components/Tech"

function App() {

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Hero />
        </div>
        <About />
        <Tech />
      </div>
    </BrowserRouter>
  )
}

export default App
