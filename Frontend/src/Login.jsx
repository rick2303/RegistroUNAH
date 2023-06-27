import React, { useState, useRef } from "react";
import axios from "axios";
import "./Login.css"


export function Login({ setUser }) {
    const [Id, setIdId] = useState("");
    const [contraseña, setContrasena] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()


        if ([Id, contraseña].includes("")) {
            setError(true);
            return;
          }
          setError(false);
          setLoading(true);
      
          // Send ID and password to the backend
          axios
            .post("http://localhost:5000/login", { Id, contraseña })
            .then((response) => {
              setLoading(false);
              const responseData = response.data; // Obtener la respuesta del backend
              
              window.location.href=responseData;
            })
            .catch((error) => {
              setLoading(false);
              // Handle error
              // ...
            });
        };
    
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
                    value={Id}
                    onChange={(e) => setIdId(e.target.value)}
                />
            <h3>Contraseña</h3>
                <input
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <p></p>
                <button>Accerder</button>
            </form>
            <br></br>
            {error && <p className="error">Debes completar todos los campos</p>}

            {loading && <span class="loader"></span>}
            
            
            <a href="/src/html/Administracion.html" id="forgetPwd">¿Olvidaste tu contraseña?</a>
            
        </>
        
    )
}


