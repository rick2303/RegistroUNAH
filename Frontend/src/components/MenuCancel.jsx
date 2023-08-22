import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { format, parseISO, set } from "date-fns";
import ModalCargarPDFCancelaciones from "./modalCargarPDFCancelaciones";
import styled from 'styled-components';

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

  // Configuramos las columnas para DataTable
  const columnas1 = [
    {
      name: "CÓDIGO",
      selector: (row) => row.CODIGO,
    },
    {
      name: "ASIGNATURA",
      selector: (row) => row.ASIGNATURA,
      width: "250px",
    },
    {
      name: "UV",
      selector: (row) => row.UV,
    },
    {
      name: "SECCIÓN",
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
      name: "HI",
      selector: (row) => row.HORA_INICIO,
    },
    {
      name: "HF",
      selector: (row) => row.HORA_FINAL,
    },
    {
      name: "OBSERVACIONES",
      selector: (row) => row.OBS,
      width: "200px",
    },
    {
      name: "PERÍODO",
      selector: (row) => row.PERIODO,
    },
  ];
  const NoDataComponent2 = () => {
    return <div>No hay registros para mostrar</div>;
  };

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
      name: "SECCIÓN",
      selector: (row) => row.SECCION,
    },
    {
      name: "PERÍODO",
      selector: (row) => row.PERIODO,
    },
    {
      name: "ESTADO",
      selector: (row) => row.ESTADO,
    },
  ];
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };

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
        alert("Solicitud procesada exitosamente, ahora suba el archivo PDF.");
        // Después de enviar la solicitud, establecer puedeEnviarSolicitud en false
        setInputValue("");
        setPuedeEnviarSolicitud(false);
        setPuedeEnviarPDF(false);
        setHistorialData2([...historialData2, ...datosCancelaciones]);
        console.log("Solicitud enviada exitosamente:", data);
      });
  };

  const tieneSolicitudesEnEspera = () => {
    // Verificar si el estudiante tiene alguna solicitud "EN ESPERA"
    return historialData2.some((solicitud) => solicitud.ESTADO === "Pendiente");
};


  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-4 text-gray-900 sm:text-3xl">
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
          noDataComponent={<NoDataComponent />}
          customStyles={customStyles}
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
          Explique las razones por las que solicita la cancelación excepcional y luego asegúrese de subir el archivo PDF.
        </p>

        <div className="d-flex align-items-center">
          <div className="mb-2 me-2 w-75">
            <textarea
              className="form-control form-control-sm border-1 p-4 rounded"
              id="exampleFormControlTextarea1"
              value={inputValue}
              style={{border: "1px solid #c6c6c6 ",borderRadius: "5px"}}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1">
          <button
              type="button"
              className="btn btn"
              onClick={enviarCancelaciones}
              disabled={tieneSolicitudesEnEspera()}
            >
              Procesar solicitud
            </button>
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-flex justify-content-end">
        <button
            type="button"
            className="btn btn"
            data-bs-toggle="modal"
            data-bs-target="#ModalCANCEL"
            disabled={tieneSolicitudesEnEspera()}
          >
            Subir archivo PDF
        </button>

          <ModalCargarPDFCancelaciones setPuedeEnviarPDF={setPuedeEnviarPDF}/>
        </div>

        <h1 className="text-2xl text-center font-bold pt-1 pb-2 text-gray-900 sm:text-3xl">
          Solitudes de cancelaciones enviadas
        </h1>
        <p className="text-xl font-normal pt-4 text-gray-900 sm:text-1xl text-left">

        </p>
        <br />
        <DataTable columns={columnas} data={historialData2} 
        customStyles={customStyles}
        noDataComponent={<NoDataComponent2 />}/>
      </div>
      <br />
    </div>
  );
};

export default MenuCancelaciones;
