import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import "../FechaMatricula.css";
import { TiArrowBackOutline } from "react-icons/ti";
import {FcDeleteRow} from "react-icons/fc"
import styled from 'styled-components';
const AppFechaNotasSemestrales = () => {
  const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(new Date());
  const [fechaFinalSeleccionada, setFechaFinalSeleccionada] = useState(new Date());
  const [pacSeleccionado, setPacSeleccionado] = useState("1PAC");
  const [fechaMinima, setFechaMinima] = useState(null);
  const [fechaMaxima, setFechaMaxima] = useState(null);
  const [historialData2, setHistorialData2] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isPac1Disabled, setIsPac1Disabled] = useState(false);
  const [isPac2Disabled, setIsPac2Disabled] = useState(false);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(false);

  useEffect(() => {
    obtenerFechasMinMax("1PAC"); // Obtener las fechas mínimas y máximas del 1PAC al inicio
    obtenerHistorialData();
    fetch("http://localhost:5000/renderizarFechaNotaSemestral")
      .then((response) => response.json())
      .then((data) => {
        setHistorialData2(data);
        console.log(data);

        // Verificar si hay registros con los valores "1PAC", "2PAC" y "3PAC" en PeriodoAcademico
        const hasPac1 = data.some((row) => row.PeriodoAcademico === "1PAC");
        const hasPac2 = data.some((row) => row.PeriodoAcademico === "2PAC");
       
        setIsPac1Disabled(hasPac1);
        setIsPac2Disabled(hasPac2);
    
        setIsGuardarDisabled(hasPac1 && hasPac2);
      })
      .catch((error) => {
        console.error("Error al obtener las fechas mínima y máxima:", error);
      });
  }, [clickCount]);

  const obtenerFechasMinMax = (selectedValue) => {
    if (selectedValue === "1PAC") {
      fetch("http://localhost:5000/enviarPlanificacionIPACSemestral")
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
      fetch("http://localhost:5000/enviarPlanificacionIIPACSemestral")
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
    fetch("http://localhost:5000/renderizarFechaNotaSemestral")
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
      Sistema: "Semestral",
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
    fetch("http://localhost:5000/enviarFechaNotas", {
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

    fetch("http://localhost:5000/EliminarFechaNotas", {
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

  const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#145eb9',
            color: 'white',
            borderBottom: '1px solid #c6c6c6', 
        },
        },
        rows: {
        style: {
            border: '1px solid #c6c6c6', 
            textAlign: 'center',
        },
        },
    };
    
    const TableHeaderCell = styled.div`
    margin: auto;
    `;

  const columnas = [
    {
      name: "FECHA INICIAL",
      selector: (row) => new Date(row.FechaInicio).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "FECHA FINAL",
      selector: (row) => new Date(row.FechaFinal).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "HORA INICIAL",
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
      name: "HORA FINAL",
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
      name: "PERÍODO ACADÉMICO",
      selector: (row) => row.PeriodoAcademico,
      sortable: true,
      center: true,
    },
    {
      name: "SISTEMA",
      selector: (row) => row.Sistema,
      sortable: true,
      center: true,
    },
    {
      name: "ELIMINAR PLANIFICACIÓN",
      cell: (row) => {
        // Compara las fechas como objetos Date
        const fechaInicioDate = new Date(row.FechaInicio);
        const fechaActualDate = new Date();
        const fechaInicioMenorOIgual = fechaInicioDate <= fechaActualDate;

        console.log(fechaInicioMenorOIgual);

        return (
          <h1
            title={
              fechaInicioMenorOIgual
                ? "Esta planificación no puede ser eliminada"
                : "Eliminar"
            }
            onClick={() => {
              if (!fechaInicioMenorOIgual) {
                eliminarFila(row);
              } else {
                // Aquí puedes mostrar un mensaje de que no se permite la eliminación
                alert("Esta planificación no puede ser eliminada.");
              }
            }}
            className={
              fechaInicioMenorOIgual ? "cursor-not-allowed" : "cursor-pointer"
            }
          >
            <FcDeleteRow
              className={
                fechaInicioMenorOIgual ? "cursor-not-allowed" : "cursor-pointer"
              }
            />
          </h1>
        );
      },
      sortable: true,
      center: true,
    },
  ];
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  
  return (
    <>
      <div className="d-flex mt-5">
  <h1 className="text-2xl mb-4 text-center font-bold pt-2 text-gray-900 sm:text-3xl col-12">
    PLANIFICACIÓN DE INGRESO DE NOTAS-SISTEMA SEMESTRAL
  </h1>
  
</div>
      <div className="contenedor mx-24">
        <div className="container m-4">
          <div className="row m-4">
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
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="fechaInicio">Inicio ingreso de notas</label>
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
                cancelLabel="Cancelar" // Establecer texto para el botón Cancelar en español
                okLabel="Aceptar" // Establecer texto para el botón Aceptar en español
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="fechaFinal">Finalización ingreso de notas</label>
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
                cancelLabel="Cancelar" // Establecer texto para el botón Cancelar en español
                okLabel="Aceptar" // Establecer texto para el botón Aceptar en español
              />
            </div>

          </div>
          <div className="row m-4">
            <div className="col-md-4 col-sm-6"></div>
            <div className="col-md-4 col-sm-6 d-flex justify-content-center align-items-end">
              <button
                id="boton-bonito"
                className="w-100"
                onClick={guardarFechas}
                disabled={
                  isGuardarDisabled ||
                  ((pacSeleccionado === "1PAC" || pacSeleccionado === "2PAC") &&
                    historialData2.some(
                      (row) => row.PeriodoAcademico === pacSeleccionado
                    ))
                }
                title={
                  isGuardarDisabled
                    ? "Ya se agregó el máximo de fechas"
                    : (pacSeleccionado === "1PAC" ) &&
                      historialData2.some(
                        (row) => row.PeriodoAcademico === pacSeleccionado
                      )
                    ? `Ya existe ${pacSeleccionado} en la tabla`
                    : ""
                }
              >
                <strong>Guardar</strong>
                
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
      <div className="my-5 mx-24">
      <h1 style={{fontSize:"14px"}}>
              Obs. La subida de notas por parte de los docentes tiene una duración de 3 días calendario.
        </h1>
        <DataTable
          className="mi-tabla"
          customStyles={customStyles}
          columns={columnas}
          data={historialData2}
          noHeader
          noDataComponent={<NoDataComponent />}
        />
      </div>
    </>
  );
};

export default AppFechaNotasSemestrales;
