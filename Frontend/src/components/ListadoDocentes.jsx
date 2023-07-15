import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FcFinePrint } from "react-icons/fc";
import { FaUserEdit } from "react-icons/fa";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { format, parseISO, set } from "date-fns";
import "../App.css";

const opcionesPaginacion = {
  pagination: {
    previous: "Anterior",
    next: "Siguiente",
    rowsPerPage: "Filas por página:",
    displayRows: "de",
    paginationLabel: "{start}-{end} de {rows} páginas",
  },
};

const ListadoDocentes = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [editedData, setEditedData] = useState({});

  const fechaActual = new Date();
  const año = fechaActual.getFullYear();

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

  // Configuramos las columnas para DataTable
  const columnas1 = [
    {
      name: "N° DE EMPLEADO",
      selector: (row) => row.NumEmpleado,
    },
    {
      name: "DNI",
      selector: (row) => row.DNI,
    },
    {
      name: "NOMBRE",
      selector: (row) => row.Nombre + " " + row.Apellido,
      width: "300px",
    },
    {
      name: "ROL",
      selector: (row) => row.SubRol,
    },
    {
      name: "Estado",
      selector: (row) => row.Estado.toUpperCase(),
    },
    
    {
      name: "Ver",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcFinePrint />
        </h1>
      ),
    },
    {
      name: "Editar",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => editarInformacion(row)}>
          <FaUserEdit style={{ color: "#1e40af "}} />
        </h1>
      ),
    },
  ];

  const mostrarInformacion = (row) => {
    setSelectedRow(row);
    toggleModal();
  };

  const editarInformacion = (row) => {
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
    console.log("Datos actualizados:", JSON.stringify(editedData));
    console.log("Datos actualizados:", editedData);
    // Realizar la solicitud fetch al backend para enviar los datos actualizados
    fetch(`http://localhost:5000/actualizarDocente/${selectedRow.NumEmpleado}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Realizar cualquier acción adicional después de guardar los cambios
        // Por ejemplo, mostrar una notificación de éxito, recargar la lista, etc.
      })
      .catch((error) => {
        console.error("Error al guardar los cambios:", error);
        // Realizar cualquier acción adicional en caso de error
      });
    
    toggleEditarModal();
  };
          //Para poner las filas no encontradas en español
  const filteredData = historialData.filter((row) => row.DNI.includes(inputValue));
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };

  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Docentes registrados
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
          paginationComponentOptions={opcionesPaginacion}
          noHeader
          //Para poner las filas no encontradas en español
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
                <strong>Nombre:</strong> {selectedRow.Nombre + " " + selectedRow.Apellido}
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
                <strong>Correo Institucional:</strong> {selectedRow.CorreoInstitucional}
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
        value={editedData.DNI}
        onChange={(e) => setEditedData({ ...editedData, DNI: e.target.value })}
      />
    </div>
  </div>
  <div className="row my-2">
  <label className="col-6">
    <strong>Rol:</strong>
  </label>
  <div className="col-6">
    <select className="form-control"
      style={{
        textAlign: "center",
      }}
      value={editedData.SubRol}
      onChange={(e) => setEditedData({ ...editedData, SubRol: e.target.value })}
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
    <select className="form-control"
      style={{
        textAlign: "center",
      }}
      value={editedData.Estado}
      onChange={(e) => setEditedData({ ...editedData, Estado: e.target.value })}
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
        onChange={(e) => setEditedData({ ...editedData, Carrera: e.target.value })}
      />
    </div>
  </div>
  <div className="row my-2">
  <label className="col-6">
    <strong>Centro Regional:</strong>
  </label>
  <div className="col-6">
    <select className="form-control"
      style={{
        textAlign: "center",
      }}
      value={editedData.CentroRegional}
      onChange={(e) => setEditedData({ ...editedData, CentroRegional: e.target.value })}
    >
      
      <option value="CU">CU</option>
      <option value="Valle de Sula">Valle de Sula</option>
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
        onChange={(e) => setEditedData({ ...editedData, CorreoPersonal: e.target.value })}
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
        onChange={(e) => setEditedData({ ...editedData, NumeroTelefono: e.target.value })}
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
        onChange={(e) => setEditedData({ ...editedData, Direccion: e.target.value })}
      />
    </div>
  </div>

</ModalBody>


<ModalFooter>
  <button className="boton_guardar" onClick={guardarCambios}>Guardar cambios</button></ModalFooter>

        </Modal>
      )}
    </div>
  );
};

export default ListadoDocentes;