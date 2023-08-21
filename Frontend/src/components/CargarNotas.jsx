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

const CargarNotas = () => {
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
  const EnviarCorreo = (IdSeccion) => {
    console.log(IdSeccion);
    fetch("http://localhost:5000/informarNotas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IdSeccion: IdSeccion }), // Send input value as JSON
    })
    .then((response) => response.json())
      .then((data) => {
        
        console.log( data); // Imprime el array recibido en la consola
        alert(data.message);
    
      })
      .catch((error) => {
        console.error("Error al enviar correos:", error);
        alert("Error al enviar correos");
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

  const columnas1 = [
    {
      name: "NÚMERO DE CUENTA",
      selector: (row) => row.IdEstudiante,
      sortable: true,
    },
    {
      name: "NOMBRE DEL ESTUDIANTE",
      selector: (row) => row.Estudiante + " " + row.Apellido,
      width: "300px",
      center: true,
    },
    {
      name: "NOTA",
      selector: (row) => row.Nota,

      center: true, 
    },
    {
      name: "ESTADO",
      selector: (row) => row.EstadoClase,

      center: true, 
    },
    {
      name: "CARGAR NOTA",
      cell: (row) => {
        const [nota, setNota] = useState(row.Nota || "");
        const [estadoClase, setEstadoClase] = useState();
        const [isNotaDisabled, setIsNotaDisabled] = useState(row.Nota !== null); // Set initial state based on whether Nota is empty

        const handleNotaChange = (e) => {
          const inputValue = e.target.value;
          const parsedValue = parseInt(inputValue);

          if (
            !Number.isNaN(parsedValue) &&
            parsedValue >= 0 &&
            parsedValue <= 100
          ) {
            // Update the state only if the input is a valid integer between 1 and 100
            setNota(parsedValue);
          }
        };

        const handleEstadoClaseChange = (e) => {
          const newEstadoClase = e.target.value;
          if (newEstadoClase !== "APR") {
            // If the selected value is not "APR", update estadoClase directly
            setEstadoClase(newEstadoClase);
          } else if (nota >= 0 && nota <= 64) {
            // If nota is between 0 and 64, only allow selection of "NSP", "REP", and "ABN"
            setEstadoClase(newEstadoClase);
          } else if (nota >= 65 && nota <= 100) {
            // If nota is between 65 and 100, set estadoClase to "APR"
            setEstadoClase("APR");
          }
        };
        const enviarInformacion = () => {
          /* if (row.Nota !== "") {
            // Si row.Nota tiene valor, no hacer nada
            return;
          }  */
          // Validar si el campo de nota está vacío
          if (nota === "") {
            alert("Debe ingresar la nota del estudiante.");
            return; // No continuar con el envío si el campo está vacío
          }
          // Crear el objeto de datos a enviar
          const dataToSend = {
            IdEstudiante: row.IdEstudiante,
            IdSeccion: row.IdSeccion,
            Nota: nota,
            EstadoClase: estadoClase,
          };
          console.log(dataToSend);

          // Realizar la solicitud fetch a la ruta http://localhost:5000/subirNota
          fetch("http://localhost:5000/subirNota", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          })
            .then((response) => response.json())
            .then((data) => {
              // Aquí puedes manejar la respuesta de la solicitud, si es necesario
              recargar();
              console.log("Respuesta del servidor:", data);
              alert("Nota cargada exitosamente");
              setIsNotaDisabled(true);
            })
            .catch((error) => {
              // Manejo de errores
              console.error("Error al enviar los datos:", error);
            });
        };

        const habilitarCampos = () => {
          setIsNotaDisabled(false); // Enable the fields
        };

        return (
          <div className="d-flex align-items-center justify-content-center">
            <input
              type="number"
              value={nota}
              onChange={(e) => {
                const inputValue = e.target.value;
                const parsedValue = parseInt(inputValue);

                if (
                  !Number.isNaN(parsedValue) &&
                  parsedValue >= 0 &&
                  parsedValue <= 100
                ) {
                  // Update the state only if the input is a valid integer between 0 and 100
                  setNota(parsedValue);
                }
                if (parsedValue === 0) {
                  setEstadoClase("NSP");
                } else if (parsedValue >= 1 && parsedValue <= 64) {
                  setEstadoClase("REP");
                } else if (parsedValue >= 65 && parsedValue <= 100) {
                  setEstadoClase("APR");
                }
              }}
              className={`form-control mr-2 ${
                isNotaDisabled ? "disabled-icon" : ""
              }`}
              disabled={isNotaDisabled}
              title={
                isNotaDisabled
                  ? "Ya se ingresó nota"
                  : "Ingrese la nota del estudiante"
              }
              min={0}
              max={100}
            />

            <select
              value={estadoClase}
              onChange={(e) => {
                setEstadoClase(e.target.value);
              }}
              className={`form-control ${
                isNotaDisabled ? "disabled-icon" : ""
              }`}
              disabled={isNotaDisabled}
              title={
                isNotaDisabled ? "Ya se ingresó el estado" : "Ingrese el estado"
              }
            >
              {nota === 0 ? (
                // If nota is 0, allow "NSP", "REP", and "ABD"
                <>
                  <option value="NSP">NSP</option>
                  <option value="REP">REP</option>
                  <option value="ABN">ABN</option>
                </>
              ) : nota >= 1 && nota <= 64 ? (
                // If nota is between 1 and 64, allow only "REP" and "ABD"
                <>
                  <option value="REP">REP</option>
                  <option value="ABN">ABN</option>
                </>
              ) : nota >= 65 && nota <= 100 ? (
                // If nota is between 65 and 100, allow only "APR"
                <option value="APR">APR</option>
              ) : (
                <option value="APR">APR</option>
              )}
            </select>
            <h1
              title="Cargar"
              className={`cursor-pointer ${
                isNotaDisabled ? "disabled-icon" : ""
              }`}
              onClick={isNotaDisabled ? null : enviarInformacion}
            >
              <FcUpload style={{ color: "#1e40af" }} />
            </h1>
            <style jsx>{`
              .disabled-icon {
                cursor: not-allowed;
              }
            `}</style>
            <h1
              title="Editar"
              className="cursor-pointer"
              onClick={() => habilitarCampos()}
            >
              <FiEdit style={{ color: "#1e40af " }} />
            </h1>
          </div>
        );
      },
      width: "330px",
      center: true, // Centrar el título
    },
  ];

  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Cargar Notas
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
              <div className="col-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3 text-right">
                  Sección: {data[0].Seccion}
                </h2>
              </div>
              <div className="col-3 text-right">
                <button
                title="Enviar correo a estudiantes"
                style={{ color: '#145eb9 !important' }}
                  className="boton_guardar px-1 py-0 w-36 h-8 text-center p-2"
                  onClick={() =>EnviarCorreo(data[0].IdSeccion)}
                >
                  Enviar correos
                </button>
              </div>
            </div>
            <DataTable
              columns={columnas1}
              className="mi-tabla"
              data={data}
              customStyles={customStyles}
              pagination
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

export default CargarNotas;
