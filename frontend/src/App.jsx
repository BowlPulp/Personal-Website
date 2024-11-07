import { useState } from 'react'
import './App.css'
import LinkTree from './components/main/LinkTree'
import Navbar from './components/navbar/Navbar'
import ViewCounter from './components/footer/ViewCounter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <LinkTree/>
      <ViewCounter/>
    </>
  )
}

export default App
