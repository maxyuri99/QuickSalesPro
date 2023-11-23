import { useState } from 'react'
import { RoutesMain } from './routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RoutesMain />
    </>
  )
}

export default App
