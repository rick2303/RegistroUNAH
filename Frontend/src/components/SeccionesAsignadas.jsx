import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FcFinePrint } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { format, parseISO } from "date-fns";
import "../App.css";
import { FcUpload } from "react-icons/fc";
import styled from 'styled-components';

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const SeccionesAsignadas = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const userData = JSON.parse(storedData);
    console.log(userData.data.NumEmpleado);
    console.log(
      JSON.stringify({
        Sistema: userData.data.Sistema,
        IdDocente: userData.data.NumEmpleado,
      })
    );
    fetch(`http://localhost:5000/estudianteSeccion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Sistema: userData.data.Sistema,
        IdDocente: userData.data.NumEmpleado,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHistorialData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);
  const recargar = () => {
    const storedData = localStorage.getItem("userData");
    const userData = JSON.parse(storedData);
    console.log(userData.data.NumEmpleado);
    
    console.log(
      JSON.stringify({
        Sistema: userData.data.Sistema,
        IdDocente: userData.data.NumEmpleado,
      })
    );
    fetch(`http://localhost:5000/estudianteSeccion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Sistema: userData.data.Sistema,
        IdDocente: userData.data.NumEmpleado,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHistorialData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };
 
    const DescargarExcel = async (IdSeccion, Clase, Periodo) => {
      const storedData = localStorage.getItem("userData");
    const userData = JSON.parse(storedData);
    console.log( JSON.stringify({
      IdSeccion: IdSeccion,
      Departamento: userData.data.Carrera,
    }));
      const URL = `http://localhost:5000/descargarListado`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdSeccion: IdSeccion,
          Departamento: userData.data.Carrera,
        }),
      });
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "application/xlsx" });
    
      const url = window.URL.createObjectURL(blob);
    
      const a = document.createElement("a");
      a.href = url;
      a.download = `Listado_${Periodo}_${Clase}.xlsx` // Nombre del archivo PDF que se descargará
      a.click();
    
      // Limpia la URL y elimina el objeto Blob
      window.URL.revokeObjectURL(url);
    };

  
  const columnas1 = [
    {
      name: "NÚMERO DE CUENTA",
      width: "300px",
      selector: (row) => row.IdEstudiante,
      center: true,
    },
    {
      name: "NOMBRE DEL ESTUDIANTE",
      selector: (row) => row.Estudiante + " " + row.Apellido,
      center: true,

    },
    {
      name: "CORREO INSTITUCIONAL",
      selector: (row) => row.CorreoInstitucional,
      center: true,
    },
    
  ];

  
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

  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Secciones Asignadas
      </h1>
      {/* Resto del código... */}
      <br />

      <div className="container">
        {/* Mapeamos cada subarray en historialData */}
        {Object.keys(historialData).length === 0 && (
          <div className="d-flex align-items-center justify-content-center text-lg my-3">
            <strong>No hay secciones asignadas</strong>
          </div>
        )}
        {historialData.map((data, index) => (
          <div key={index}>
            {/* Encabezado que muestra la asignatura y la sección */}
            <div className="row">
              <div className="col-5">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Asignatura: {data[0].Asignatura}
                </h2>
              </div>
              <div className="col-3">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  {data[0].Periodo}
                </h2>
              </div>
              <div className="col-2">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Sección: {data[0].Seccion}
                </h2>
              </div>
              <div className="col-2 text-right">
                <button
                title="Enviar correo a estudiantes"
                style={{ color: '#145eb9 !important' }}
                  className="px-1 py-0 w-36 h-8 text-center p-2 "
                  onClick={() => DescargarExcel(data[0].IdSeccion, data[0].Asignatura, data[0].Periodo)}
                >
                  Descargar Excel
                </button>
              </div>
            </div>
            <DataTable
              columns={columnas1}
              className="mi-tabla"
              data={data}
              pagination
              customStyles={customStyles}
              paginationComponentOptions={paginationComponentOptions}
              noHeader
              noDataComponent={<NoDataComponent />}
              conditionalRowStyles={[
                {
                  when: (row) => row.isSelected,
                  style: {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                },
              ]}
            />
            <div
              className="divider my-3"
              style={{
                height: "2px",
                width: "100%",
                backgroundColor: "#1e40af",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionesAsignadas;
