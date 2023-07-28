import React, { useEffect, useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import { FcDeleteRow } from "react-icons/fc";
import "../FechaMatricula.css";

const AppFechaPeriodoSemestral = () => {
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
      Sistema: "Semestral",
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

  // Configuramos las columnas para DataTable
  const columnas = [
    {
      name: "Fecha Inicial",
      selector: (row) => new Date(row.FechaInicio).toLocaleDateString(),
      sortable: true,
      center: true,
    },
    {
      name: "Fecha Final",
      selector: (row) => new Date(row.FechaFinal).toLocaleDateString(),
      sortable: true,
      center: true,
    },
    {
      name: "Periodo Académico",
      selector: (row) => row.PeriodoAcademico,
      sortable: true,
      center: true,
    },
    {
      name: "Sistema",
      selector: (row) => row.Sistema,
      sortable: true,
      center: true,
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <h1 onClick={() => eliminarFila(row)} className="cursor-pointer">
          <FcDeleteRow className="cursor-pointer" />
        </h1>
      ),
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
          Planificación de períodos-semestrales
        </h1>
      </div>
      <div className="contenedor mx-24">
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

export default AppFechaPeriodoSemestral;
