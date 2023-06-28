import { useState } from "react"
import "./Admin.css"
export function Admin({ user, setUser }) {


    const [loading, setLoading] = useState(false)


    const handleLogout = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setUser([])
        }, 1000)
    }


    return (
        <div className="home">
            {
                loading
                    ? <span class="loader"></span>
                    : <>
                        <h1>Modulo de Admin</h1>
                        <strong>{user}</strong>
                        <button onClick={handleLogout}>Salir</button>
                    </>
            }
        </div>
    )
}
