import React, { useEffect, useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import "../FechaMatricula.css";
import { Navbar } from "reactstrap";
//import { Navbar } from "../components/Navbar";

const AppFechaPeriodo = () => {
  const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(new Date());
  const [fechaFinalSeleccionada, setFechaFinalSeleccionada] = useState(new Date());
  const [pacSeleccionado, setPacSeleccionado] = useState('');
  

  const convertirFechaAJSON = (fechaInicio, fechaFinal) => {
    const fechaJSON = {
      FechaInicio: fechaInicio.toISOString().split("T")[0],
      FechaFinal: fechaFinal.toISOString().split("T")[0],
      PeriodoAcademico: pacSeleccionado,
    };
    return fechaJSON;
  };

  const handleFechaInicioChange = (fecha) => {
    setFechaInicioSeleccionada(fecha);
  };

  const handleFechaFinalChange = (fecha) => {
    setFechaFinalSeleccionada(fecha);
  };

  const handlePacChange = (event) => {
    setPacSeleccionado(event.target.value);
  };

  const guardarFechas = () => {
    const fechaJSON = convertirFechaAJSON(fechaInicioSeleccionada, fechaFinalSeleccionada);
    console.log(fechaJSON);
    // Realizar la solicitud al backend para enviar el JSON
    fetch("http://localhost:5000/enviarPlanificacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fechaJSON),
    })
      .then((response) => response.json())
      .then((data) => {
        // Mostrar el mensaje de alerta si el guardado fue exitoso
        alert("Se han guardado las fechas exitosamente");
      })
      .catch((error) => {
        console.error("Error al guardar las fechas:", error);
      });
  };

  return (
    <>
    {/* <Navbar/> */}
    <h1 className="text-2xl  mb-4 text-center font-bold pt-2 text-gray-900 sm:text-3xl">
      Planificación de Períodos
      </h1>
      <div className="contenedor">
        <div className="container m-4">
          <div className="row m-4">
            <div className="col-md-4">
              <label htmlFor="fechaInicio">Inicio de Período</label>
              <DatePicker
                className="form-control"
                value={fechaInicioSeleccionada}
                onChange={handleFechaInicioChange}
                format="dd MMM yyyy"
                
                renderInput={(props) => <input {...props} readOnly />}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="fechaFinal">Finalización de Período</label>
              <DatePicker
                className="form-control"
                value={fechaFinalSeleccionada}
                onChange={handleFechaFinalChange}
                format="dd MMM yyyy"
                renderInput={(props) => <input {...props} readOnly />}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="pac" className="mb-3">
                Seleccione el PAC
              </label>
              <select
                className="form-control"
                value={pacSeleccionado}
               onChange={handlePacChange}
              >
                <option className=" text-xs" value="1PAC">
                  1PAC
                </option>
                <option value="2PAC">2PAC</option>
                <option value="3PAC">3PAC</option>
              </select>
            </div>
          </div>
          <div className="row m-4">
            <div className="col-md-4 col-sm-6"></div>
            <div className="col-md-4 col-sm-6 d-flex justify-content-center align-items-end">
              <button id="boton-bonito" className="w-100" onClick={guardarFechas}>
                Guardar
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppFechaPeriodo;
