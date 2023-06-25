import { useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "./img/UNAH_logo.png";

export function Login({ setUser }) {
  const [Id, setIdId] = useState("");
  const [contraseña, setContrasena] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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
      <img src={logo} alt="Logo" />
      <h1>UNAH Login</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Nº Cuenta</h2>
        <input
          type="text"
          value={Id}
          onChange={(e) => setIdId(e.target.value)}
        />
        <h2>Contraseña</h2>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <p></p>
        <button>Acceder</button>
      </form>
      <br></br>
      {error && <p className="error">Debes completar todos los campos</p>}

      {loading && <span className="loader"></span>}
      <a href="/src/html/Administracion.html">¿Olvidaste tu contraseña?</a>
    </>
  );
}
