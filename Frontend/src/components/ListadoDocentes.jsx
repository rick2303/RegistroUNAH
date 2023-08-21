import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FcFinePrint } from "react-icons/fc";
import { FaUserEdit } from "react-icons/fa";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { format, parseISO } from "date-fns";
import "../App.css";
import styled from "styled-components";

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const ListadoDocentes = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [respuestaJefe, setRespuestaJefe] = useState();
  const [respuestaCoordi, setRespuestaCoordi] = useState();

  const jefeExistente = async () => {
    try {
      const response = await fetch("http://localhost:5000/jefeDepto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Carrera: editedData.Carrera,
          CentroRegional: editedData.CentroRegional,
        }),
      });
      const data = await response.json();
      setRespuestaJefe(data);
    } catch (error) {
      console.error("Error al guardar cambios", error);
    }
  };
  const coordiMax = async () => {
    try {
      const response = await fetch("http://localhost:5000/coordiDepto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Carrera: editedData.Carrera,
          CentroRegional: editedData.CentroRegional,
        }),
      });

      const data = await response.json();
      setRespuestaCoordi(data);
      console.log("Coordinador", data);
    } catch (error) {
      console.error("Error al guardar cambios", error);
    }
  };

  const actualizarDatos = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/actualizarDocente/${selectedRow.NumEmpleado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del servidor:", data);

          // Actualizar los datos de la tabla
          setHistorialData((prevData) => {
            const updatedData = prevData.map((row) =>
              row.NumEmpleado === selectedRow.NumEmpleado ? editedData : row
            );
            return updatedData;
          });

          // Cerrar el modal de edición
          toggleEditarModal();

          // Realizar cualquier acción adicional después de guardar los cambios
          // Por ejemplo, mostrar una notificación de éxito, etc.
        })
        .then(() => {
          alert("Datos actualizados correctamente");
        })
        .catch((error) => {
          console.error("Error al guardar los cambios:", error);
          // Realizar cualquier acción adicional en caso de error
        });
    } catch (error) {
      console.error("Error al guardar cambios", error);
    }
  };
  // Realizar la solicitud fetch al backend para enviar los datos actualizados

  useEffect(() => {
    fetch("http://localhost:5000/docentes")
      .then((response) => response.json())
      .then((data) => {
        setHistorialData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data whenever the inputValue changes
    fetchData();
  }, [inputValue]);
  // Configuramos las columnas para DataTable
  const columnas1 = [
    {
      name: "NÚMERO DE EMPLEADO",
      selector: (row) => row.NumEmpleado,
      center: true,
    },
    {
      name: "DNI",
      selector: (row) => row.DNI,
      center: true,
    },
    {
      name: "NOMBRE DEL DOCENTE",
      selector: (row) => row.Nombre + " " + row.Apellido,
      width: "300px",
      sortable: true,
    },
    {
      name: "ROL",
      selector: (row) => row.SubRol,
    },
    {
      name: "ESTADO",
      selector: (row) => row.Estado.toUpperCase(),
      center: true,
    },
    {
      name: "VER",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcFinePrint />
        </h1>
      ),
    },
    {
      name: "EDITAR",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => editarInformacion(row)}>
          <FaUserEdit style={{ color: "#1e40af " }} />
        </h1>
      ),
    },
  ];

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

  const mostrarInformacion = (row) => {
    setSelectedRow(row);
    toggleModal();
  };

  const editarInformacion = (row) => {
    jefeExistente();
    coordiMax();
    setSelectedRow(row);
    setEditedData(row);
    toggleEditarModal();
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditarModal = () => {
    setModalEditarOpen(!modalEditarOpen);
  };

  const guardarCambios = () => {
    // Aquí puedes realizar la lógica para enviar los datos actualizados al backend
    if (editedData.SubRol == "JEFE DEPARTAMENTO") {
      jefeExistente();
      if (!respuestaJefe) {
        actualizarDatos();
      } else {
        alert("Ya existe un jefe de departamento");
      }
    } 
    if (editedData.SubRol == "COORDINADOR") {
      coordiMax();
      if (respuestaCoordi) {
        actualizarDatos();
      } else {
        alert("Maximos coordinadores alcanzados");
      }
    }
    if(editedData.SubRol == 'DOCENTE'){
      actualizarDatos()
    }
  };
  // Function to fetch data based on the input value
  const fetchData = () => {
    console.log(JSON.stringify({ DNI: inputValue }));
    fetch("http://localhost:5000/docentesDNI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ DNI: inputValue }), // Send input value as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        // Si el JSON no es un array, conviértelo en un array con un solo elemento
        const dataArray = Array.isArray(data) ? data : [data];
        console.log("Array recibido del backend:", dataArray); // Imprime el array recibido en la consola
        setHistorialData(dataArray);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };
  // Para poner las filas no encontradas en español
  const filteredData = historialData.filter((row) =>
    row.DNI.includes(inputValue)
  );
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };

  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Docentes registrados
      </h1>
      <div className="container">
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
          placeholder="Ingresar DNI para filtrar"
        />
      </div>
      <br />

      <div className="container">
        <DataTable
          columns={columnas1}
          className="mi-tabla"
          data={filteredData}
          pagination
          customStyles={customStyles}
          paginationComponentOptions={paginationComponentOptions}
          noHeader
          // Para poner las filas no encontradas en español
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
            <ul>
              <li>
                <strong>Número de Empleado:</strong> {selectedRow.NumEmpleado}
              </li>
              <li>
                <strong>DNI:</strong> {selectedRow.DNI}
              </li>
              <li>
                <strong>Nombre:</strong>{" "}
                {selectedRow.Nombre + " " + selectedRow.Apellido}
              </li>
              <li>
                <strong>Rol:</strong> {selectedRow.SubRol}
              </li>
              <li>
                <strong>Estado:</strong> {selectedRow.Estado}
              </li>
              <li>
                <strong>Carrera:</strong> {selectedRow.Carrera}
              </li>
              <li>
                <strong>Centro Regional:</strong> {selectedRow.CentroRegional}
              </li>
              <li>
                <strong>Correo Institucional:</strong>{" "}
                {selectedRow.CorreoInstitucional}
              </li>
              <li>
                <strong>Correo Personal:</strong> {selectedRow.CorreoPersonal}
              </li>
              <li>
                <strong>Teléfono:</strong> {selectedRow.NumeroTelefono}
              </li>
              <li>
                <strong>Dirección:</strong> {selectedRow.Direccion}
              </li>
              <li>
                <strong>Fecha contratación:</strong>{" "}
                {format(parseISO(selectedRow.FechaContratacion), "dd/MM/yyyy")}
              </li>
              <li>
                <strong>Fecha nacimiento:</strong>{" "}
                {format(parseISO(selectedRow.FechaNacimiento), "dd/MM/yyyy")}
              </li>
            </ul>
          </ModalBody>
        </Modal>
      )}

      {selectedRow && (
        <Modal isOpen={modalEditarOpen} toggle={toggleEditarModal}>
          <ModalHeader className="text-white bg-blue-800 text-2xl">
            <strong>Editar Información del Docente</strong>
            <button className="close boton_cierre" onClick={toggleEditarModal}>
              <span aria-hidden="true">X</span>
            </button>
          </ModalHeader>
          <ModalBody className="container">
            {/* Aquí puedes agregar los campos de edición necesarios */}
            <div className="row my-2">
              <label className="col-6">
                <strong>Nombres de Empleado:</strong>
              </label>
              <div className="col-6">
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  type="text"
                  value={editedData.Nombre}
                  onChange={(e) =>
                    setEditedData({ ...editedData, Nombre: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>Apellidos de Empleado:</strong>
              </label>
              <div className="col-6">
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  type="text"
                  value={editedData.Apellido}
                  onChange={(e) =>
                    setEditedData({ ...editedData, Apellido: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>DNI:</strong>
              </label>
              <div className="col-6">
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  type="text"
                  maxLength="13"
                  value={editedData.DNI}
                  onChange={(e) =>
                    setEditedData({ ...editedData, DNI: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>Rol:</strong>
              </label>
              <div className="col-6">
                <select
                  className="form-control"
                  style={{
                    textAlign: "center",
                  }}
                  value={editedData.SubRol}
                  onChange={(e) =>
                    setEditedData({ ...editedData, SubRol: e.target.value })
                  }
                >
                  <option value="JEFE DEPARTAMENTO">Jefe Departamento</option>
                  <option value="COORDINADOR">Coordinador</option>
                  <option value="DOCENTE">Docente</option>
                </select>
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>Estado:</strong>
              </label>
              <div className="col-6">
                <select
                  className="form-control"
                  style={{
                    textAlign: "center",
                  }}
                  value={editedData.Estado}
                  onChange={(e) =>
                    setEditedData({ ...editedData, Estado: e.target.value })
                  }
                >
                  <option value="ACTIVO">Activo</option>
                  <option value="INACTIVO">Inactivo</option>
                </select>
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>Carrera:</strong>
              </label>
              <div className="col-6">
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  type="text"
                  value={editedData.Carrera}
                  onChange={(e) =>
                    setEditedData({ ...editedData, Carrera: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>Centro Regional:</strong>
              </label>
              <div className="col-6">
                <select
                  className="form-control"
                  style={{
                    textAlign: "center",
                  }}
                  value={editedData.CentroRegional}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      CentroRegional: e.target.value,
                    })
                  }
                >
                  <option value="CU">CU</option>
                  <option value="VS">VS</option>
                  <option value="CURC">CURC</option>
                  <option value="CURNO">CURNO</option>
                  <option value="CURLA">CURLA</option>
                  <option value="CURLP">CURLP</option>
                  <option value="TEC-DANLI">TEC-DANLI</option>
                  <option value="TEC-AGUAN">TEC-AGUAN</option>
                </select>
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>Correo Personal:</strong>
              </label>
              <div className="col-6">
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  type="text"
                  value={editedData.CorreoPersonal}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      CorreoPersonal: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>Número de Teléfono:</strong>
              </label>
              <div className="col-6">
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  type="text"
                  value={editedData.NumeroTelefono}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      NumeroTelefono: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="row my-2">
              <label className="col-6">
                <strong>Dirección:</strong>
              </label>
              <div className="col-6">
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  type="text"
                  value={editedData.Direccion}
                  onChange={(e) =>
                    setEditedData({ ...editedData, Direccion: e.target.value })
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="boton_guardar"
              onClick={() => {
                guardarCambios();
              }}
            >
              Guardar cambios
            </button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default ListadoDocentes;
