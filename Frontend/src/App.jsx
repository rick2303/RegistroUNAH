import { Login } from './Login'
import { Admin } from './Admin'
import { useState } from 'react'
import './App.css'

function App() {

  const [user, setUser] = useState([])

  return (
    <div className="App">


      {
        !user.length > 0
          ? <Login setUser={setUser} />
          : <Admin user={user} setUser={setUser} />
      }
    </div>
  )
}

export default App
