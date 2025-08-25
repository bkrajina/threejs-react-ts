import './App.css'
import ThreejsSphere from './components/threejs_test'

function App() {

  return (
    <>
      <div className="w-screen h-screen bg-black">
        <div className="grid grid-cols-2 w-full h-full">
          <div className="w-full h-full border-red-500 min-h-full">
            <ThreejsSphere />
          </div>
          <div className="w-full h-full bg-black"></div>
        </div>
      </div>
    </>
  )
}

export default App
