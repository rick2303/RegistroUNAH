import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { FcCancel, FcFinePrint } from "react-icons/fc";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalCargarPDFCambioCentro from "./modalCargarPDFCambioCentro";

const MenuCambioCentro = () => {
  const [NumCuenta, setNumCuenta] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [CentroRegional, setCentroRegional] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [centroSeleccionado, setCentroSeleccionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [centrosData, setCentros] = useState([]);
  const [InfoEstudiante, setInfoEstudiante] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [puedeEnviarPDF, setPuedeEnviarPDF] = useState(true);
  const fechaActual = new Date();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const numCuenta = userData.data.NumCuenta;
      const nombre = userData.data.Nombre;
      const apellido = userData.data.apellido; 
      console.log(numCuenta);
      console.log(nombre);
      console.log(apellido);
      setNombre(nombre);
      setApellido(apellido);
      setNumCuenta(numCuenta)
    }
    fetchInfoAndCentros();
  }, [NumCuenta]);

  const handleCentroChange = (event) => {
    setCentroSeleccionado(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      NumCuenta: NumCuenta,
      Centro: centroSeleccionado,
      idSolicitud:filteredData.IdSolicitud
    };

    // Resto del código se mantiene igual
    console.log(data);

    fetch(`http://localhost:5000/UpdateCambioCentro`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      console.log("Solicitud exitosa");
      alert("Solicitud exitosa");
      setInputValue("");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error en la Solicitud", error);
    });
  };
  

const fetchInfoAndCentros = async () => {
  try {
    const [infoRes, carrerasRes, soliRes] = await Promise.all([
      fetch("http://localhost:5000/obtenerInfoEstudiant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ NumCuenta: NumCuenta }),
      }),
      fetch("http://localhost:5000/centrosRegionales"), // Cambio de ruta para obtener los centros regionales
      fetch("http://localhost:5000/ObtenerCambiosCentro", { // Cambio de ruta para obtener las solicitudes de cambio de centro
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ NumCuenta: NumCuenta }),
      }),
    ]);

    const infoData = await infoRes.json();
    const centrosData = await carrerasRes.json(); // Cambio de ruta para obtener los centros regionales
    const soliData = await soliRes.json();
    console.log(centrosData);
    setInfoEstudiante(infoData);
    setFilteredData(soliData);
    // Eliminar duplicados utilizando un Set y luego convertirlo nuevamente a un array
    const centrosUnicos = Array.from(new Set(centrosData)); // Cambio de variable de carrerasUnicas a centrosUnicos
    setCentros(centrosUnicos);
    console.log(infoData);
    console.log(soliData);
  } catch (error) {
    console.error("Error al obtener datos de los centros regionales o información del estudiante:", error);
  }
};


const tieneSolicitudesEnEspera = () => {
  // Verificar si el estudiante tiene alguna solicitud "EN ESPERA"
  return !filteredData.every((solicitud) => solicitud.CentroNuevo === null);
};

  
  const columnas = [
    {
      name: "FECHA DE SOLICITUD",
      selector: (row) => row.FechaSolicitud.split("T")[0],
  },
  {
      name: "N° CUENTA",
      selector: (row) => row.NumCuenta,
      width: "300px",
  },

{
  name: "CENTRO DE CAMBIO",
  selector: (row) => row.CentroNuevo,
  width: "300px",
},
  {
      name: "DICTAMEN",
      selector: (row) => row.Dictamen,
  },
  {
      name: "Estado",
      selector: (row) => row.Estado.toUpperCase(),
  },


  ];
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };



  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };



 
  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Cambio de Centro Regional
      </h1>
     
        <div className="container ">

   
          <div className="container pt-5">
            <label htmlFor="centroRegional">Seleccione el Centro Regional al que desea trasladarse:</label>
            <br />
            <br />
          <select
            className="form-select border-1 w-50"
            id="centro"
            aria-label="Default select example"
            value={centroSeleccionado}
            onChange={handleCentroChange}
            >
            <option></option>
            {centrosData.map((centro) => (
                // Solo usamos "carrera" como nombre de variable
                <option key={centro.NombreCentro} value={centro.Centro}>
                {centro.NombreCentro.toUpperCase()}
                </option>
            ))}
          </select>
          </div>

          <br />
            <br />
         

    <div className="d-flex align-items-center">
     <label htmlFor="centroRegional">Suba el archivo pdf que contenga la justificacion del cambio de centro   </label>
        <a
            className="btn btn-primary ml-5"
            data-bs-toggle="modal"
            data-bs-target="#ModalCANCEL"
            disabled={!puedeEnviarPDF}
          >
            Subir archivo PDF
          </a>
    </div>
          <div className="pt-4">
          <button type="button" className="btn btn-success" onClick={handleSubmit} disabled={tieneSolicitudesEnEspera()}>
              Enviar Solicitud
          </button>
          </div>

    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Solicitudes realizadas
        </h1>
      
        <br />
        <DataTable
        columns={columnas}
        className="mi-tabla"
        noDataComponent={<NoDataComponent />}
        data={filteredData}
        />

    </div>
    <br>
    </br>
    <br>

    </br>
    <div className="d-flex justify-content-center">

          <ModalCargarPDFCambioCentro setPuedeEnviarPDF={setPuedeEnviarPDF}/>
        </div>

    </div>
  );
};


export default MenuCambioCentro;



