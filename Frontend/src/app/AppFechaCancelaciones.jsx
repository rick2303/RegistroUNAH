import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import { TiArrowBackOutline } from "react-icons/ti";
import "../FechaMatricula.css";
import {FcDeleteRow} from "react-icons/fc"

const AppFechaCancelaciones = () => {
  const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(new Date());
  const [fechaFinalSeleccionada, setFechaFinalSeleccionada] = useState(new Date());
  const [pacSeleccionado, setPacSeleccionado] = useState("1PAC");
  const [fechaMinima, setFechaMinima] = useState(null);
  const [fechaMaxima, setFechaMaxima] = useState(null);
  const [historialData2, setHistorialData2] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isPac1Disabled, setIsPac1Disabled] = useState(false);
  const [isPac2Disabled, setIsPac2Disabled] = useState(false);
  const [isPac3Disabled, setIsPac3Disabled] = useState(false);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(false);

  useEffect(() => {
    obtenerFechasMinMax("1PAC"); // Obtener las fechas mínimas y máximas del 1PAC al inicio
    obtenerHistorialData();
    fetch("http://localhost:5000/renderizarCancelaciones")
      .then((response) => response.json())
      .then((data) => {
        setHistorialData2(data);
        console.log(data);

        // Verificar si hay registros con los valores "1PAC", "2PAC" y "3PAC" en PeriodoAcademico
        const hasPac1 = data.some((row) => row.PeriodoAcademico === "1PAC");
        const hasPac2 = data.some((row) => row.PeriodoAcademico === "2PAC");
        const hasPac3 = data.some((row) => row.PeriodoAcademico === "3PAC");
        setIsPac1Disabled(hasPac1);
        setIsPac2Disabled(hasPac2);
        setIsPac3Disabled(hasPac3);
        setIsGuardarDisabled(hasPac1 && hasPac2 && hasPac3);
      })
      .catch((error) => {
        console.error("Error al obtener las fechas mínima y máxima:", error);
      });
  }, [clickCount]);

  const obtenerFechasMinMax = (selectedValue) => {
    if (selectedValue === "1PAC") {
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
    } else if (selectedValue === "2PAC") {
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
    } else if (selectedValue === "3PAC") {
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

  const obtenerHistorialData = () => {
    fetch("http://localhost:5000/renderizarCancelaciones")
      .then((response) => response.json())
      .then((data) => {
        setHistorialData2(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener el historial de matrícula:", error);
      });
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
    console.log(fechaJSON);
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
    fetch("http://localhost:5000/enviarCancelaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fechaJSON),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Se han guardado las fechas exitosamente");
        setClickCount(clickCount + 1);
      })
      .catch((error) => {
        console.error("Error al guardar las fechas:", error);
      });
  };

  const eliminarFila = (row) => {
    const a = JSON.stringify({ idPlanificacion: `${row.idPlanificacion}` });
console.log(a);

    fetch("http://localhost:5000/EliminarCancelacionesExcepcionales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idPlanificacion: `${row.idPlanificacion}` }),
    })
      
      .then((data) => {
        alert("Se ha eliminado la fila exitosamente");
        setClickCount(clickCount + 1);
      })
      .catch((error) => {
        console.error("Error al eliminar la fila:", error);
      });
  };

  const columnas = [
    {
      name: "Fecha Inicial",
      selector: (row) => new Date(row.FechaInicio).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Fecha Final",
      selector: (row) => new Date(row.FechaFinal).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Hora Inicial",
      selector: (row) => {
        const fechaHoraInicio = new Date(row.FechaInicio);
        fechaHoraInicio.setHours(row.HoraInicio.split(":")[0]);
        fechaHoraInicio.setMinutes(row.HoraInicio.split(":")[1]);
        fechaHoraInicio.setSeconds(row.HoraInicio.split(":")[2]);
        return format(fechaHoraInicio, "h:mm a");
      },
      sortable: true,
    },
    {
      name: "Hora Final",
      selector: (row) => {
        const fechaHoraFinal = new Date(row.FechaFinal);
        fechaHoraFinal.setHours(row.HoraFinal.split(":")[0]);
        fechaHoraFinal.setMinutes(row.HoraFinal.split(":")[1]);
        fechaHoraFinal.setSeconds(row.HoraFinal.split(":")[2]);
        return format(fechaHoraFinal, "h:mm a");
      },
      sortable: true,
    },
    {
      name: "Periodo Académico",
      selector: (row) => row.PeriodoAcademico,
      sortable: true,
      center: true,
    },
    {
      name: "Eliminar",
      cell: (row) => (
       <h1  className="cursor-pointer"
       onClick={() => eliminarFila(row)}>
        <FcDeleteRow />
       </h1>
        
      ),
      center: true,
    },
  ];
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  
  return (
    <>
    
    <div className="d-flex mt-5">
  <h1 className="text-2xl mb-4 text-center font-bold pt-2 text-gray-900 sm:text-3xl col-11">
    Cancelaciones excepcionales
  </h1>
  <div className="col-1 d-flex justify-content-end">
    <a
      href="../html/Administracion.html"
      className="text-end fas fa-pencil-alt cursor-pointer"
      title="Regresar"
    >
      <label><h1><TiArrowBackOutline className="text-2xl cursor-pointer" /></h1></label>
      
    </a>
  </div>
</div>

      
      <div className="contenedor">
        <div className="container m-4">
          <div className="row m-4">
            <div className="col-md-4">
              <label htmlFor="fechaInicio">Inicio de Cancelaciones</label>
              <DateTimePicker
                className="form-control"
                value={fechaInicioSeleccionada}
                onChange={handleFechaInicioChange}
                format="dd MMM yyyy h:mm a"
                minDate={fechaMinima}
                maxDate={fechaMaxima}
                maxDateMessage="La fecha no debe ser posterior a la fecha máxima"
                minDateMessage="La fecha no debe ser anterior a la fecha mínima"
                renderInput={(props) => <input {...props} readOnly />}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="fechaFinal">Finalización de Cancelaciones</label>
              <DateTimePicker
                className="form-control"
                value={fechaFinalSeleccionada}
                onChange={handleFechaFinalChange}
                format="dd MMM yyyy h:mm a"
                minDate={fechaMinima}
                maxDate={fechaMaxima}
                maxDateMessage="La fecha no debe ser posterior a la fecha máxima"
                minDateMessage="La fecha no debe ser anterior a la fecha mínima"
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
                <option value="1PAC" disabled={isPac1Disabled}>
                  1PAC
                </option>
                <option value="2PAC" disabled={isPac2Disabled}>
                  2PAC
                </option>
                <option value="3PAC" disabled={isPac3Disabled}>
                  3PAC
                </option>
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
                disabled={isGuardarDisabled}
              >
                Guardar
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <DataTable
          className="mi-tabla"
          columns={columnas}
          data={historialData2}
          noHeader
          noDataComponent={<NoDataComponent />}
        />
      </div>
    </>
  );
};

export default AppFechaCancelaciones;
