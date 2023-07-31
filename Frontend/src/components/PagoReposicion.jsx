import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "styled-components";

const MenuPagoReposicion = () => {
  const [NumCuenta, setNumCuenta] = useState("");
  const [Sistema, setsistema] = useState("");
  const [inputValue, setInputValue] = useState("");

  const enviarSolicitud = async () => {
    const motivo = document.getElementById("solicitud").value;
    console.log(motivo);

    useEffect(() => {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const userData = JSON.parse(storedData);
        const numCuenta = userData.data.NumCuenta;
        const sistema = userData.data.Sistema;
        setNumCuenta(numCuenta);
        setsistema(sistema);
      }
    }, [NumCuenta]);
  
    // Enviar solicitud al backend
    fetch("http://localhost:5000/subirSolicitud", {
      method: "POST",
      body: JSON.stringify({NumCuenta:NumCuenta,Justificacion:motivo, Sistema: Sistema}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Solicitud procesada exitosamente");
        window.location.reload();
      });
  };

  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Pago De Reposición
      </h1>
      <div className="container">
        <br />
        <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
          Coloque el motivo de porqué hará reposición
        </p>

        <div className="d-flex align-items-center">
          <div className="mb-2 me-2 w-75">
            <textarea
              className="form-control form-control-sm border border-2 p-4 rounded"
              id="solicitud"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={enviarSolicitud}
            >
              Enviar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPagoReposicion;