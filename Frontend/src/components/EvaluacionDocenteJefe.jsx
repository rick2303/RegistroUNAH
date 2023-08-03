import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FcFinePrint } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { format, parseISO } from "date-fns";
import "../App.css";


const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const EvaluacionDocenteJefe = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [carrera, setCarrera] = useState("");
  const [centroRegional, setCentroRegional] = useState("");
  const [editedData, setEditedData] = useState({});

  const fetchDataGeneral = (carrera, centroRegional) => {
    fetch(`http://localhost:5000/docentesDepartamento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Carrera: carrera, CentroRegional: centroRegional }),
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
  
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const userData = JSON.parse(storedData);
    console.log(userData);
    const carrera = userData.data.Carrera;
    setCarrera(carrera);
    const centroRegional = userData.data.CentroRegional;
    setCentroRegional(centroRegional);

  
    // Guarda los valores de carrera y centroRegional en variables locales
    const carreraActual = carrera;
    const centroRegionalActual = centroRegional;
  
    // Llama a la función fetchData para obtener los datos usando las variables locales
    fetchDataGeneral(carreraActual, centroRegionalActual);
  }, []);
  

  useEffect(() => {
    // Fetch data whenever the inputValue changes
    if (inputValue.trim() === "") {
      // Si el inputValue está vacío, llamamos a fetchData con los valores actuales de carrera y centroRegional
      const storedData = localStorage.getItem("userData");
      const userData = JSON.parse(storedData);
      console.log(userData);
      const carrera = userData.data.Carrera;
      setCarrera(carrera);
      const centroRegional = userData.data.CentroRegional;
      setCentroRegional(centroRegional);
  
    
      // Guarda los valores de carrera y centroRegional en variables locales
      const carreraActual = carrera;
      const centroRegionalActual = centroRegional;
    
      // Llama a la función fetchData para obtener los datos usando las variables locales
      fetchDataGeneral(carreraActual, centroRegionalActual);
    } else {
      // Si el inputValue no está vacío, llamamos a fetchData con el inputValue
      fetchData();
    }
  }, [inputValue]);
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
    /* {
      name: "ROL",
      selector: (row) => row.SubRol,
    },
    {
      name: "Estado",
      selector: (row) => row.Estado.toUpperCase(),
    }, */
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
          <FcAbout style={{ color: "#1e40af "}} />
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

  

// Function to fetch data based on the input value
const fetchData = () => {
  console.log(JSON.stringify({ DNI: inputValue }))
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

     
    </div>
  );
};

export default EvaluacionDocenteJefe;
