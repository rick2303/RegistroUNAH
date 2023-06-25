import { useState } from "react"
import "./Login.css"


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
        data = {
            usuario: usuario,
            pass: password
        }
        fetch('http://localhost:5000/iswAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response => {
              // Manejar la respuesta del backend
            })
            .catch(error => {
              // Manejar cualquier error que ocurra durante la solicitud
            });
    }
    
    return (
        <>
            <form
                className="formulario"
                onSubmit={handleSubmit}
                id="formularioEstilo"
            >
            <h3>Número de cuenta</h3>
                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
            <h3>Contraseña</h3>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p></p>
                <button>Accerder</button>
            </form>
            <br></br>
            {error && <p className="error">Debes completar todos los campos</p>}

            {loading && <span class="loader"></span>}
            
            
            <a href="/src/html/Administracion.html" >¿Olvidaste tu contraseña?</a>

        </>
        
    )
}


