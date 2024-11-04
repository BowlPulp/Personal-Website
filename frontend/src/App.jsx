import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LinkTree from './components/main/LinkTree'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LinkTree/>
    </>
  )
}

export default App
