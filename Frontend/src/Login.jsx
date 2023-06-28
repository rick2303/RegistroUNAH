import React, { useState } from "react";
import "./Login.css";

export function Login({ setUser }) {
  const [Id, setIdId] = useState("");
  const [contraseña, setContrasena] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([Id, contraseña].includes("")) {
      setError(true);
      setErrorMessage("Debes completar todos los campos");
      return;
    }
    setError(false);
    setLoading(true);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id, contraseña }),
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
            response.text().then((responseData) => {
                console.log(responseData);
                window.location.href = responseData;
              });
        } else if (response.status === 500) {
          response.json().then((data) => {
            if (data.error) {
              setError(true);
              setErrorMessage(data.error);
            } else {
              setError(true);
              setErrorMessage("Error en la solicitud");
            }
          });
        } else {
          setError(true);
          setErrorMessage("Error en la solicitud");
        }
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
      {error && (
        <p className="errorBox">
          <span className="errorText">{errorMessage}</span>
        </p>
      )}
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
        <button>Acceder</button>
      </form>
      <br />
      

      {loading && <span className="loader"></span>}

      <a href="/src/html/Administracion.html" id="forgertPwd">
        ¿Olvidaste tu contraseña?
      </a>
    </>
  );
}
