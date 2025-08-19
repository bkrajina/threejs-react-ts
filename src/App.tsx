import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreejsSphere from './components/threejs_test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "w-screen h-screen border-red-500">
        <ThreejsSphere/>
      </div>

    </>
  )
}

export default App
