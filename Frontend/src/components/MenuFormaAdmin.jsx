import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { Input, Button } from "reactstrap";
import { format, parseISO, set } from "date-fns";

const MenuHistorialAdmin = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");

  const fechaActual = new Date();
  const año = fechaActual.getFullYear();

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
    if (inputValue && periodoAcademicoActual && año) {
      showData(inputValue, periodoAcademicoActual, año);
    }
    console.log(periodoAcademicoActual);
  }, [inputValue, periodoAcademicoActual, año]);

  const showData = async (inputValue, periodo, year) => {
    console.log(inputValue);
    try {
      const URL = "http://localhost:5000/enviarClasesQueEstaCursando";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NumCuenta: inputValue,
          Periodo: periodo,
          año: year,
        }),
      });
      const data = await response.json();
      setHistorialData(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }

    try {
      const URL = "http://localhost:5000/enviarInformacionEstudiante";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ NumCuenta: inputValue }),
      });
      const data = await response.json();
      setUsers(data);
      console.log(data);
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
      <div>
        <Input
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginLeft: "80px",
            maxWidth: "300px",
          }}
          id="inputCuenta"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ingresar número de cuenta"
        />
      </div>
      <br></br>

      {users.length > 0 ? (
        <>
          <img
            src={"../img/uploads/" + users[0].Imagen1}
            alt="No tiene imagen de perfil"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "auto",
            }}
          />

          <h3 className="text-2xl text-center font-bold pt-4 pb-3 text-gray-900 sm:text-2xl">
            {users[0].Nombre} {users[0].Apellido}
          </h3>
          <ul>
            <li>
              <p className="text-xl font-normal pt-4 pb-1 text-gray-900 sm:text-1xl text-center">
                Indice del Periodo: {users[0].IndicePeriodo}
              </p>
            </li>
            <li>
              <p className="text-xl font-normal pt-4 pb-5 text-gray-900 sm:text-1xl text-center">
                Indice Global: {users[0].IndiceGlobal}
              </p>
            </li>
          </ul>
        </>
      ) : (
        <p>.</p>
      )}

      <div className="container">
        <DataTable columns={columnas1} data={historialData}  noDataComponent={<NoDataComponent />}></DataTable>
      </div>
    </div>
  );
};

export default MenuHistorialAdmin;
