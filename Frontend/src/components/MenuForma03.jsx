import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { format, parseISO, set } from "date-fns";
const MenuForma = () => {
  const [NumCuenta, setNumCuenta] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const numCuenta = userData.data.NumCuenta;
      setNumCuenta(numCuenta);
    }
  }, []);
  const obtenerFechasMinMaxIPAC = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/enviarPlanificacionIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
        setPeriodoAcademicoActualPAC("1PAC");
      }
    } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    }
  };
  const obtenerFechasMinMaxIIPAC = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/enviarPlanificacionIIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
        setPeriodoAcademicoActualPAC("2PAC");
      }
    } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    }
  };
  const obtenerFechasMinMaxIIIPAC = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/enviarPlanificacionIIIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
        setPeriodoAcademicoActualPAC("3PAC");
      }
    } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    }
  };
  obtenerFechasMinMaxIPAC();
  obtenerFechasMinMaxIIPAC();
  obtenerFechasMinMaxIIIPAC();
  useEffect(() => {
    if (NumCuenta && periodoAcademicoActual && año) {
      showData(NumCuenta, periodoAcademicoActual, año);
    }
    console.log(periodoAcademicoActual);
  }, [NumCuenta, periodoAcademicoActual, año]);
  const showData = async (cuenta, periodo, year) => {
    try {
      const URL = "http://localhost:5000/enviarClasesQueEstaCursando";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NumCuenta: cuenta,
          Periodo: periodo,
          año: year,
        }),
      });
      const data = await response.json();
      setHistorialData(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  // Configuramos las columnas para DataTable
  const columnas1 = [
    {
      name: "CODIGO",
      selector: (row) => row.CODIGO,
    },
    {
      name: "ASIGNATURA",
      selector: (row) => row.ASIGNATURA,
    },
    {
      name: "SECCION",
      selector: (row) => row.SECCION,
    },
    {
      name: "HORA DE INICIO",
      selector: (row) => row.HORA_INICIO,
    },
    {
      name: "HORA FINAL",
      selector: (row) => row.HORA_FINAL,
    },
    {
      name: "EDIFICIO",
      selector: (row) => row.EDIFICIO,
    },
    {
      name: "UV",
      selector: (row) => row.UV,
    },
    {
      name: "AULA",
      selector: (row) => row.AULA,
    },
    {
      name: "OBSERVACIONES",
      selector: (row) => row.OBS,
    },
    {
      name: "PERIODO",
      selector: (row) => row.PERIODO,
    },
  ];
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Forma 03
      </h1>
      <div className="container">
        <DataTable columns={columnas1} data={historialData}  noDataComponent={<NoDataComponent />}></DataTable>
      </div>
    </div>
  );
};
export default MenuForma;