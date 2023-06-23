import { useState } from "react"
import "./Login.css"
import logo from "./img/UNAH_logo.png"



export function Login({ setUser }) {
    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()


        if ([usuario, password].includes("")) {
            setError(true)
            return
        }
        setError(false)

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setUser(usuario)
        }, 2000)

    }

    return (
        <>
            <img src={logo}></img>
            <h1>UNAH Login</h1>
            <form
                className="formulario"
                onSubmit={handleSubmit}
            >
            <h2>Nº Cuenta</h2>
                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
            <h2>Contraseña</h2>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p></p>
                <button>Accerder</button>
            </form>
            {error && <p className="error">Debes completar todos los campos</p>}

            {loading && <span class="loader"></span>}

        </>
    )
}