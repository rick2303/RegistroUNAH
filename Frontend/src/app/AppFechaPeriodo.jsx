import React, { useEffect, useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import DataTable from "react-data-table-component";
import { format, addWeeks, subWeeks } from "date-fns";
import { FcDeleteRow } from "react-icons/fc";
import "../FechaMatricula.css";
import styled from "styled-components";
const AppFechaPeriodo = () => {
  const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(
    new Date()
  );
  const [fechaFinalSeleccionada, setFechaFinalSeleccionada] = useState(
    new Date()
  );
  const [pacSeleccionado, setPacSeleccionado] = useState("1PAC");
  const [historialData2, setHistorialData2] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isPac1Disabled, setIsPac1Disabled] = useState(false);
  const [isPac2Disabled, setIsPac2Disabled] = useState(false);
  const [isPac3Disabled, setIsPac3Disabled] = useState(false);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(false);

  const convertirFechaAJSON = (fechaInicio, fechaFinal) => {
    const fechaJSON = {
      FechaInicio: fechaInicio.toISOString(),
      FechaFinal: fechaFinal.toISOString(),
      PeriodoAcademico: pacSeleccionado,
      Sistema: "Trimestral",
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

  const eliminarFila = (row) => {
    // Realizar la solicitud al backend para eliminar la fila con la información de "row"
    const a = JSON.stringify({ idPlanificacion: `${row.idPlanificacion}` });
    console.log(a);

    fetch("http://localhost:5000/EliminarPlanificacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idPlanificacion: `${row.idPlanificacion}` }),
    })
      .then((data) => {
        // Mostrar el mensaje de alerta si la eliminación fue exitosa
        alert("Se ha eliminado la fila exitosamente");
        // Incrementar el contador de clics
        setClickCount(clickCount + 1);
      })
      .catch((error) => {
        console.error("Error al eliminar la fila:", error);
      });
  };

  const guardarFechas = () => {
    const fechaJSON = convertirFechaAJSON(
      fechaInicioSeleccionada,
      fechaFinalSeleccionada
    );
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
        // Incrementar el contador de clics
        setClickCount(clickCount + 1);
      })
      .catch((error) => {
        console.error("Error al guardar las fechas:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/renderizarPlanificacion")
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

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#145eb9",
        color: "white",
        borderBottom: "1px solid #c6c6c6",
      },
    },
    rows: {
      style: {
        border: "1px solid #c6c6c6",
        textAlign: "center",
      },
    },
  };

  const TableHeaderCell = styled.div`
    margin: auto;
  `;

  // Configuramos las columnas para DataTable
  const columnas = [
    {
      name: "FECHA INICIAL",
      selector: (row) => new Date(row.FechaInicio).toLocaleDateString(),

      center: true,
    },
    {
      name: "FECHA INICIAL",
      selector: (row) => new Date(row.FechaFinal).toLocaleDateString(),

      center: true,
    },
    {
      name: "PERÍODO ACADÉMICO",
      selector: (row) => row.PeriodoAcademico,

      center: true,
    },
    {
      name: "SISTEMA",
      selector: (row) => row.Sistema,
      center: true,
    },
    /* {
      name: "ELIMINAR PLANIFICACIÓN",
      cell: (row) => (
        <h1 title="Eliminar" onClick={() => eliminarFila(row)} className="cursor-pointer">
          <FcDeleteRow className="cursor-pointer" />
        </h1> 
        
      ),
      sortable: true,
      center: true,
    } */
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
  // Función para calcular la fecha máxima permitida en el segundo DatePicker
  const calcularMaxFechaFinal = () => {
    return addWeeks(fechaInicioSeleccionada, 15); // Cambiar 13 por 16 para establecer la fecha máxima permitida a 16 semanas después de la fecha de inicio
  };

  // Función para calcular la fecha mínima permitida en el segundo DatePicker
  const calcularMinFechaFinal = () => {
    return addWeeks(fechaInicioSeleccionada, 13); // Establecer la fecha mínima permitida a 13 semanas después de la fecha de inicio
  };
  return (
    <>
      <div className="d-flex mt-5">
        <h1 className="text-2xl mb-4 text-center font-bold pt-4 text-gray-900 sm:text-3xl col-12">
          PLANIFICACIÓN DE PERÍODOS ACADÉMICOS TRIMESTRALES
        </h1>
        <br />
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
                style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              >
                <option
                  className=" text-xs"
                  value="1PAC"
                  disabled={isPac1Disabled}
                >
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
            <div className="col-md-4">
              <label htmlFor="fechaInicio">Inicio de Período</label>
              <DatePicker
                className="form-control"
                value={fechaInicioSeleccionada}
                onChange={handleFechaInicioChange}
                format="dd MMM yyyy"
                renderInput={(props) => <input {...props} readOnly />}
                //minDate={new Date()} // Esto establece la fecha mínima seleccionable a la fecha actual
                cancelLabel="Cancelar" // Establecer texto para el botón Cancelar en español
                okLabel="Aceptar" // Establecer texto para el botón Aceptar en español
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
                minDate={calcularMinFechaFinal()} // Esto establece la fecha mínima seleccionable a 13 semanas después de la fecha de inicio
                maxDate={calcularMaxFechaFinal()} // Esto establece la fecha máxima seleccionable a 16 semanas después de la fecha de inicio
                maxDateMessage="Un periodo no puede tener más de 15 semanas"
                minDateMessage="Un periodo no puede tener menos de 13 semanas"
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
                    : (pacSeleccionado === "1PAC" ||
                        pacSeleccionado === "2PAC") &&
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
        <h1 style={{ fontSize: "14px" }}>
          Obs. Los períodos trimestrales tienen una duración de 13 a 16 semanas,
          el sistema toma dicha restricciones en cuenta al momento de programar
          en el calendario.
        </h1>
        <br></br>
        <DataTable
          className="mi-tabla"
          columns={columnas}
          customStyles={customStyles}
          data={historialData2}
          noHeader
          noDataComponent={<NoDataComponent />}
        />
      </div>
    </>
  );
};

export default AppFechaPeriodo;
