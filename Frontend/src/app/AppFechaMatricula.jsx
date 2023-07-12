import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import { format } from "date-fns";
import "../FechaMatricula.css";
//import { Navbar } from "../components/Navbar";
const AppFechaMatricula = () => {
  const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(
    new Date()
  );
  const [fechaFinalSeleccionada, setFechaFinalSeleccionada] = useState(
    new Date()
  );
  const [pacSeleccionado, setPacSeleccionado] = useState('');
  const [fechaMinima, setFechaMinima] = useState(null);
  const [fechaMaxima, setFechaMaxima] = useState(null);
 
  
  useEffect(() => {
    obtenerFechasMinMax();
  }, []);

  const obtenerFechasMinMax = (pacSeleccionado) => {

    if (pacSeleccionado == "1PAC"){
      
    fetch("http://localhost:5000/enviarPlanificacionIPAC")
    .then((response) => response.json())
    .then((data) => {
      setFechaMinima(new Date(data[0].FechaInicio));
      setFechaMaxima(new Date(data[0].FechaFinal));
      console.log(data[0]);
    })
    .catch((error) => {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    });
  }

  
  if (pacSeleccionado == "2PAC"){
      
    fetch("http://localhost:5000/enviarPlanificacionIIPAC")
    .then((response) => response.json())
    .then((data) => {
      setFechaMinima(new Date(data[0].FechaInicio));
      setFechaMaxima(new Date(data[0].FechaFinal));
      console.log(data[0]);
    })
    .catch((error) => {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    });
  }

  
  if (pacSeleccionado == "3PAC"){
      
    fetch("http://localhost:5000/enviarPlanificacionIIIPAC")
    .then((response) => response.json())
    .then((data) => {
      setFechaMinima(new Date(data[0].FechaInicio));
      setFechaMaxima(new Date(data[0].FechaFinal));
      console.log(data[0]);
    })
    .catch((error) => {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    });
  }
    
  };

  const convertirFechaAJSON = (fechaInicio, fechaFinal) => {
    const fechaJSON = {
      FechaInicio: fechaInicio.toISOString().split("T")[0],
      HoraInicio: fechaInicio.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      FechaFinal: fechaFinal.toISOString().split("T")[0],
      HoraFinal: fechaFinal.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
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
    const selectedValue = event.target.value;
    setPacSeleccionado(selectedValue);
    obtenerFechasMinMax(selectedValue);
  };
  

  const guardarFechas = () => {
    const fechaJSON = convertirFechaAJSON(
      fechaInicioSeleccionada,
      fechaFinalSeleccionada
    );
    console.log(fechaJSON);
    // Realizar la solicitud al backend para enviar el JSON
    fetch("http://localhost:5000/enviarMatricula", {
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
       Matrícula
      </h1>
      <div className="contenedor">
        <div className="container m-4">
          <div className="row m-4">
            <div className="col-md-4">
              <label htmlFor="fechaInicio">Inicio de Matricula</label>
              <DateTimePicker
                className="form-control"
                value={fechaInicioSeleccionada}
                onChange={handleFechaInicioChange}
                format="dd MMM yyyy h:mm a"
                minDate={fechaMinima}
    			maxDate={fechaMaxima}
                renderInput={(props) => <input {...props} readOnly />}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="fechaFinal">Finalización de Matricula</label>
              <DateTimePicker
                className="form-control"
                value={fechaFinalSeleccionada}
                onChange={handleFechaFinalChange}
                format="dd MMM yyyy h:mm a"
				minDate={fechaMinima}
    			maxDate={fechaMaxima}
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
                // id="SelectorPac"
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
              <button
                id="boton-bonito"
                className="w-100"
                onClick={guardarFechas}
              >
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

export default AppFechaMatricula;
