import React, { useState, useEffect } from "react";
import {
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { FcShare } from "react-icons/fc";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import "../horizontal-columns.css"
import "../Perfil_estudiante.css"
import styled from 'styled-components';
import "../custom-carousel-styles.css";

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
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    

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
      name:"NÚMERO DE EMPLEADO",
      selector: (row) => row.NumEmpleado,
      sortable: true,
      width: "190px",
      center: true,
    },
    {
      name: "NÚMERO DE IDENTIDAD",
      selector: (row) => row.DNI,
      sortable: true,
      center: true,
      
    },
    {
      name: "NOMBRE",
      selector: (row) => row.Nombre + " " + row.Apellido,
      width: "400px",
      sortable: true,
    },
    {
      name: "VER NOTAS",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcShare style={{ color: "#1e40af "}} />
        </h1>
      ),
      width: "200px",
    },
  ];

  const dataEstatica = [

    ...Array.from({ length: 30 }).map((_, index) => ({
      IdSeccion: 24,
      IdDocente: 15209,
      IdClase: "II-222",
      Asignatura: "Estadistica Aplicada",
      CorreoInstitucional: "nicolas.lovo@unah.hn",
      Seccion: 1101,
      Periodo: "2PAC",
      IdEstudiante: `2019200363${index + 1}`,
      Estudiante: `Estudiante${index + 1}`,
      Apellido: `Apellido${index + 1}`,
      Nota: 82,
      EstadoClase: "APR"
    })),

    ...Array.from({ length: 30 }).map((_, index) => ({
      IdSeccion: 24,
      IdDocente: 15209,
      IdClase: "II-321",
      CorreoInstitucional: "nicolas.lovo@unah.hn",
      Asignatura: "Investigación de Operaciones I",
      Seccion: 1201,
      Periodo: "2PAC",
      IdEstudiante: `2021200322${index + 1}`,
      Estudiante: `Estudiante${index + 31}`,
      Apellido: `Apellido${index + 31}`,
      Nota: 82,
      EstadoClase: "APR"
    })),
    ...Array.from({ length: 30 }).map((_, index) => ({
      IdSeccion: 24,
      IdDocente: 15209,
      IdClase: "II-321",
      CorreoInstitucional: "nicolas.lovo@unah.hn",
      Asignatura: "Investigación de Operaciones I",
      Seccion: 1300,
      Periodo: "2PAC",
      IdEstudiante: `2022101575${index + 1}`,
      Estudiante: `Estudiante${index + 61}`,
      Apellido: `Apellido${index + 61}`,
      Nota: 82,
      EstadoClase: "APR"
    })),
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
      console.log("Datos obtenidos:", data);  
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
      <div className="container ">
      <div className="row">
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
      </div>
      </div>
      <br />

      <div className="container">
        <DataTable
          columns={columnas1}
          className="mi-tabla"
          customStyles={customStyles}
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

      <Modal
  isOpen={modalOpen}
  toggle={() => setModalOpen(false)}
  className="modal-fullscreen"
>
  <ModalHeader
    className="text-white text-2xl modal-header-custom"
    style={{ backgroundColor:"#145eb9"}}
  >
    <strong>DETALLE DE NOTAS</strong>
    <button

      className="close boton_cierre"
      onClick={() => setModalOpen(false)}
    >
      <span aria-hidden="true" >X</span>
    </button>
  </ModalHeader>
        <ModalBody className="modal-content">
     <Carousel
  showThumbs={false} 
  showStatus={false} 
  dynamicHeight={true} 
  emulateTouch={true} 

>
  {Object.entries(
    dataObtenida.reduce((sections, nota) => {
      const seccionKey = `${nota.Seccion}-${nota.Asignatura}`;
      if (!sections[seccionKey]) {
        sections[seccionKey] = {
          seccion: nota.Seccion,
          asignatura: nota.Asignatura,
          notas: [],
        };
      }
      sections[seccionKey].notas.push(nota);
      return sections;
    }, {})
  ).map(([seccionKey, { seccion, asignatura, notas }]) => (
    <div key={seccionKey} className="column">
      <h4 style={{ fontWeight: "bold", fontSize: "1.5rem", textTransform: "uppercase" }}>
        Sección: {seccion} - Asignatura: {asignatura}
      </h4>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Nº</th>
            <th>NUMERO CUENTA</th>
            <th>NOMBRE</th>
            <th>APELLIDO</th>
            <th>CORREO INSTITUCIONAL</th>
            <th>NOTA</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={nota.IdEstudiante + "-" + index}>
              <td>{index + 1}</td> {/* Conteo de filas */}
              <td>{nota.IdEstudiante}</td>
              <td>{nota.Estudiante}</td>
              <td>{nota.Apellido}</td>
              <td>{nota.CorreoInstitucional}</td>
              <td>{nota.Nota}</td>
              <td>{nota.EstadoClase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))}
</Carousel>
         
        </ModalBody>
       
      </Modal>
    </div>
  );
};

export default MenuIngresoNotas;
