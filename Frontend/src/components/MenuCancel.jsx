import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { format, parseISO, set } from "date-fns";
import ModalCargarPDFCancelaciones from "./modalCargarPDFCancelaciones";

const MenuCancelaciones = () => {
  const [NumCuenta, setNumCuenta] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [historialData2, setHistorialData2] = useState([]);
  const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [puedeEnviarPDF, setPuedeEnviarPDF] = useState(true);


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

    try {
      const URL = "http://localhost:5000/enviarSolicitudesRealizadas";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ NumCuenta: cuenta, Periodo: periodo }),
      });
      const data = await response.json();
      setHistorialData2(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
    setPuedeEnviarPDF(historialData2.length === 0);
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
      name: "UV",
      selector: (row) => row.UV,
    },
    {
      name: "SECCION",
      selector: (row) => row.SECCION,
    },
    {
      name: "EDIFICIO",
      selector: (row) => row.EDIFICIO,
    },
    {
      name: "AULA",
      selector: (row) => row.AULA,
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
      name: "OBSERVACIONES",
      selector: (row) => row.OBS,
    },
    {
      name: "PERIODO",
      selector: (row) => row.PERIODO,
    },
  ];

  // Configuramos las columnas para DataTable
  const columnas = [
    {
      name: "CODIGO",
      selector: (row) => row.CODIGO,
    },
    {
      name: "ASIGNATURA",
      selector: (row) => row.ASIGNATURA,
    },
    {
      name: "UV",
      selector: (row) => row.UV,
    },
    {
      name: "SECCION",
      selector: (row) => row.SECCION,
    },
    {
      name: "PERIODO",
      selector: (row) => row.PERIODO,
    },
    {
      name: "ESTADO",
      selector: (row) => row.ESTADO,
    },
  ];

  const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

  const handleSelectedRowsChange = (selectedRows) => {
    if (selectedRows.selectedCount > 0) {
      const filas = selectedRows.selectedRows;
      console.log(filas);
      setFilasSeleccionadas(filas);
    } else {
      setFilasSeleccionadas([]);
    }
  };


  const enviarCancelaciones = async () => {
    const razones = document.getElementById(
      "exampleFormControlTextarea1"
    ).value;
    console.log(razones);
    console.log(periodoAcademicoActual);

    // Crear un arreglo para almacenar los datos de las filas seleccionadas
    const datosCancelaciones = [];

    // Iterar sobre las filas seleccionadas y agregar los datos al arreglo
    filasSeleccionadas.forEach((fila) => {
      const idClase = fila.CODIGO;
      const asignatura = fila.ASIGNATURA;
      const uv = fila.UV;
      const seccion = fila.SECCION;
      const estado = "Pendiente";

      // Agregar los datos al arreglo
      datosCancelaciones.push({
        idClase,
        asignatura,
        uv,
        seccion,
        año,
        periodo: periodoAcademicoActual,
        estado,
        descripcion: razones,
        Id: NumCuenta,
      });
    });

    // Enviar el arreglo de cancelaciones al backend
    fetch("http://localhost:5000/subirSolicitudCancelacion", {
      method: "POST",
      body: JSON.stringify(datosCancelaciones), // Enviar el arreglo completo
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Solicitud procesada exitosamente, ahora suba el archivo PDF");
        // Después de enviar la solicitud, establecer puedeEnviarSolicitud en false
        setPuedeEnviarSolicitud(false);
        setPuedeEnviarPDF(false);
        setHistorialData2([...historialData2, ...datosCancelaciones]);
      });
  };

  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Cancelaciones Excepcionales
      </h1>
      <div className="container">
        <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
          Seleccione las asignaturas que desea cancelar
        </p>

        <DataTable
          columns={columnas1}
          data={historialData}
          selectableRows
          onSelectedRowsChange={handleSelectedRowsChange} // Callback para obtener las filas seleccionadas
          conditionalRowStyles={[
            {
              when: (row) => row.CODIGO === "TU_CODIGO_DE_CONDICION",
              style: {
                backgroundColor: "green",
                color: "white",
              },
            },
            // Otros estilos condicionales si es necesario
          ]}
        />
        <br />
        <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
          Explique las razones por las que realiza la cancelación excepcional
        </p>

        <div className="d-flex align-items-center">
          <div className="mb-2 me-2 w-75">
            <textarea
              className="form-control form-control-sm border border-2 p-4 rounded"
              id="exampleFormControlTextarea1"
              maxLength="1500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={enviarCancelaciones}
              disabled={historialData2.length > 0}
            >
              Procesar solicitud
            </button>
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-flex justify-content-end">
          <a
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#ModalCANCEL"
            disabled={!puedeEnviarPDF}
          >
            Subir archivo PDF
          </a>
          <ModalCargarPDFCancelaciones setPuedeEnviarPDF={setPuedeEnviarPDF}/>
        </div>

        <h1 className="text-2xl text-center font-bold pt-1 pb-2 text-gray-900 sm:text-3xl">
          Solitudes de cancelaciones enviadas
        </h1>
        <p className="text-xl font-normal pt-4 text-gray-900 sm:text-1xl text-left">
        Asegúrese de haber subido el archivo PDF para poder visualizar su solicitud
        </p>
        <DataTable columns={columnas} data={historialData2} />
      </div>
    </div>
  );
};

export default MenuCancelaciones;
