import React, { useState, useEffect } from "react";
import "./Login.css";
import ModalDocentes from "./components/ModalDocentes";

export function Login({ setUser }) {
  
  useEffect(() => {
    // Eliminar datos del localStorage al cargar el componente
    localStorage.removeItem("userData");
  }, []);
  const [Id, setId] = useState("");
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
          response.json().then((responseData) => {
            const url = responseData.url;
            const data = responseData;
            console.log(data);
            localStorage.setItem("userData", JSON.stringify(data)); // Almacenar datos en localStorage
            window.location.assign(url);
          });
        } else if (response.status === 500) {
          response.json().then((data) => {
            if (data.error) {
              setError(true);
              setErrorMessage(data.error);
              setId(""); // Restablecer el valor del campo de entrada Id
              setContrasena(""); // Restablecer el valor del campo de entrada contraseña
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
          onChange={(e) => setId(e.target.value)}
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

      <a href="/src/html/recuperacionContrasena/Recuperacion.html" >
        ¿Olvidaste tu contraseña?
      </a> 
      
{/* 
<hr></hr>
<a href="/src/html/Estudiante.html" >
  estudiante
</a>
<hr></hr>
<a href="/src/html/Docente.html" >
  Docente
</a>
*/}

     
    </>
  );
}
