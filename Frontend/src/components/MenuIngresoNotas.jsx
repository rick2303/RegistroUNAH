import React, { useState, useEffect } from "react";
import {
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { FcShare } from "react-icons/fc";
import "../App.css";

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const MenuIngresoNotas = () => {
    const [inputValue, setInputValue] = useState("");
    const [historialData, setHistorialData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [carrera, setCarrera] = useState("");
    const [centroRegional, setCentroRegional] = useState("");
    const [Sistema, setSistema] = useState("");
    const [dataObtenida, setDataObtenida] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)

  

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
    const sistema = userData.data.Sistema;
    setSistema(sistema);

    // Guarda los valores de carrera y centroRegional en variables locales
    const carreraActual = carrera;
    const centroRegionalActual = centroRegional;
    const Sistema = sistema;

    // Llama a la función fetchData para obtener los datos usando las variables locales
    fetchDataGeneral(carreraActual, centroRegionalActual,Sistema);
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
    {
      name: "VER NOTAS",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcShare style={{ color: "#1e40af "}} />
        </h1>
      ),
    },
  ];


  const mostrarInformacion = (row) => {
    setSelectedRow(row);
    console.log(
        JSON.stringify({ IdDocente: row.NumEmpleado, Sistema: row.Sistema })
      );
    fetch('http://localhost:5000/verNotas', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IdDocente: row.NumEmpleado,
        Sistema: row.Sistema,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos obtenidos:", data);  // Imprime los datos en la consola
      setDataObtenida(data);
      setModalOpen(true); // Abre el modal
    })
      .catch((error) => {
        console.error("Error al obtener los datos de evaluación:", error);
      });
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
        Notas Ingresadas
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

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
        <ModalHeader toggle={() => setModalOpen(false)}>Detalles de Notas</ModalHeader>
        <ModalBody>
          {dataObtenida.map((nota, index) => (
            <div key={index}>
              <p>Asignatura: {nota.Asignatura}</p>
              <p>Sección: {nota.Seccion}</p>
              <p>Periodo: {nota.Periodo}</p>
              <p>Estudiante: {nota.IdEstudiante}</p>
              <p>Nota: {nota.Nota}</p>
              <p>Estado de Clase: {nota.EstadoClase}</p>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MenuIngresoNotas;
