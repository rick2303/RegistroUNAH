import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FcFinePrint } from "react-icons/fc";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "styled-components";
import { format, parseISO, set } from "date-fns";
import "../App.css";
const Notas = () => {
  const [NumCuenta, setNumCuenta] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
  const fechaActual = new Date();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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
      console.log(data);
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
      center: true,
    },
    {
      name: "ASIGNATURA",
      selector: (row) => row.ASIGNATURA,
      center: true,
    },
    {
      name: "SECCION",
      selector: (row) => row.SECCION,
      center: true,
    },
    
    {
      name: "PERIODO",
      selector: (row) => row.PERIODO,
      center: true,
    },
    
    {
      name: "EVALUACIÓN DOCENTE",
      selector: (row) => row.OBS,
      center: true,
    },
    {
      name: "NOTA FINAL",
      selector: (row) => row.OBS,
      center: true,
    },
    
    {
      name: "PERFIL DOCENTE",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcFinePrint />
        </h1>
      ),
      center: true,
    },
  ];
  const mostrarInformacion = (row) => {
    setSelectedRow(row);
    console.log(row);
    toggleModal();
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Notas Actuales
      </h1>
      <div className="container">
        <DataTable
         className="mi-tabla"
         columns={columnas1} 
         data={historialData} 
          noDataComponent={<NoDataComponent />}></DataTable>
      </div>
      {selectedRow && (
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader className="text-white bg-blue-800 text-2xl">
            <strong>Información del Docente</strong>
            <button className="close boton_cierre" onClick={toggleModal}>
              <span aria-hidden="true">X</span>
            </button>
          </ModalHeader>
          <ModalBody>
            
          </ModalBody>
        </Modal>
      )}

    </div>
  );
};
export default Notas;