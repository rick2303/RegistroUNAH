import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { FcCancel, FcFinePrint } from "react-icons/fc";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
      Nombre: Nombre,
      Apellido: Apellido,
      CentroRegional: CentroRegional,
      CentroDeCambio: centroSeleccionado,
      RazonDeCambio: inputValue,
      FechaSolicitud: fechaActual,
      Dictamen: "EN ESPERA", 
    };

    // Resto del código se mantiene igual
    console.log(data);

    fetch("http://localhost:5000/subirSolicitudCambioCentro", { 
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
      fetch("http://localhost:5000/ObtenerSolicitudCambioCentro", { // Cambio de ruta para obtener las solicitudes de cambio de centro
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
     return filteredData.some((solicitud) => solicitud.Dictamen === "EN ESPERA");

  };
  const columnas1 = [
    {
      name: "FECHA DE SOLICITUD",
      selector: (row) => row.FechaSolicitud.split("T")[0],
  },
  {
      name: "NOMBRE",
      selector: (row) => row.Nombre + " " + row.Apellido,
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
  {
      name: "Ver",
      cell: (row) => (
      <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcFinePrint />
      </h1>
      ),
  },
  {
      name: "Eliminar",
      cell: (row) => (
      <h1 className="cursor-pointer" onClick={() => EliminarInformacion(row)}>
          <FcCancel />
      </h1>
      ),
  },
  ];

  const mostrarInformacion = (row) => {
    setSelectedRow(row);
    
    toggleModal();
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
          <br />
          <div className="container pt-5">
            <label htmlFor="centroRegional">Seleccione el Centro Regional al que desea trasladarse:</label>
            <br />
            <br />
            <select
              id="centroRegional"
              className="form-select border-1 w-50"
              value={centroSeleccionado}
              onChange={handleCentroChange}
            >
              <option value=""></option>
              <option value="CU">Ciudad Universitaria</option>
              <option value="VS">Valle de Sula</option>
              <option value="CURC">CURC</option>
              <option value="CURNO">CURNO</option>
              <option value="CURLA">CURLA</option>
              <option value="CURLP">CURLP</option>
              <option value="TEC-DANLI">TEC-DANLI</option>
              <option value="TEC-AGUAN">TEC-AGUAN</option>
            </select>
          </div>
          
    <p className="pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
        Justifique el cambio de centro:
    </p>

    <div className="d-flex align-items-center">
        <div className="mb-2 me-2 w-75">
        <textarea
            className="form-control form-control-sm border border-2 p-4 rounded"
            id="exampleFormControlTextarea1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        </div>

        <div className="grid grid-cols-1">
        <button type="button" className="btn btn-success" onClick={handleSubmit} disabled={tieneSolicitudesEnEspera()}>
            Enviar Solicitud
        </button>
        </div>
    </div>
    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Solicitudes realizadas
        </h1>
      
        <br />
        <DataTable
        columns={columnas1}
        className="mi-tabla"
        data={filteredData}
        />
         {selectedRow && (
        <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader className="text-white bg-blue-800 text-2xl">
                <strong>Solicitud realizada</strong>
                <button className="close boton_cierre" onClick={toggleModal}>
                <span aria-hidden="true">X</span>
                </button>
            </ModalHeader>
            <ModalBody>
                <ul>
                <li>
                    <strong>Fecha de solicitud:</strong> {selectedRow.FechaSolicitud.split("T")[0]}
                </li>
                <li>
                    <strong>Nombre:</strong> {selectedRow.Nombre + " " + selectedRow.Apellido}
                </li>
                <li>
                    <strong>Dictamen:</strong> {selectedRow.Dictamen}
                </li>
                <li>
                    <strong>Estado:</strong> {selectedRow.Estado}
                </li>
                <li>
                    <strong>Justificacion por parte del coordinador:</strong> {selectedRow.JustificacionCoordi}
                </li>
                </ul>
            </ModalBody>
            </Modal>
        )}
    </div>
    </div>
  );
};


export default MenuCambioCentro;










{/*

import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import "styled-components";
import { FcCancel, FcFinePrint } from "react-icons/fc";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const MenuCambioCentro = () => {
  const [Centro, setCentro] = useState(''); 
  const [inputValue, setInputValue] = useState(''); 

  const handleSubmit = () => {


    const data = {
      centro: Centro,
      justificacion: inputValue,
    };


    fetch('http://localhost:5000/subirSolicitud', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
       
        console.log('Solicitud exitosa');
        
        setCentro('');
        setInputValue('');
      })
      .catch((error) => {
        
        console.error('Error en la Solicitud', error);
      });
  };


  const columnas1 = [
    {
    name: "FECHA DE SOLICITUD",
    selector: (row) => row.FechaSolicitud.split("T")[0],
},
{
    name: "CARRERA ACTUAL",
    selector: (row) => row.Carrera,
},
{
    name: "CARRERA DE CAMBIO",
    selector: (row) => row.CarreraDeCambio,
},
{
    name: "NOMBRE",
    selector: (row) => row.Nombre + " " + row.Apellido,
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
{
    name: "Ver",
    cell: (row) => (
    <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
        <FcFinePrint />
    </h1>
    ),
},
{
    name: "Eliminar",
    cell: (row) => (
    <h1 className="cursor-pointer" onClick={() => EliminarInformacion(row)}>
        <FcCancel />
    </h1>
    ),
},
];

const mostrarInformacion = (row) => {
    setSelectedRow(row);
    
    toggleModal();
};

  



  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Cambio de Centro
      </h1>
      <div className="container">
        <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
          Seleccionar el Centro al que desea trasladarse
        </p>

        <div className="form-group">
          <label htmlFor="centroRegional">Centro Regional:</label>
          <select
            id="centroRegional"
            className="control"
            value={Centro}
            onChange={(e) => setCentro(e.target.value)}
          >
            <option value=""></option>
            <option value="CU">Ciudad Universitaria</option>
            <option value="VS">Valle de Sula</option>
            <option value="CURC">CURC</option>
            <option value="CURNO">CURNO</option>
            <option value="CURLA">CURLA</option>
            <option value="CURLP">CURLP</option>
            <option value="TEC-DANLI">TEC-DANLI</option>
            <option value="TEC-AGUAN">TEC-AGUAN</option>
          </select>
        </div>

        <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
          Justificar el cambio de centro
        </p>

        <div className="d-flex align-items-center">
          <div className="mb-2 me-2 w-75">
            <textarea
              className="form-control form-control-sm border border-2 p-4 rounded"
              id="exampleFormControlTextarea1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1">
            <button type="button" className="btn btn-success" onClick={handleSubmit}>
              Enviar Solicitud
            </button>
          </div>
        </div>
        </div>
    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Solicitudes realizadas
        </h1>
        <p className="pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
            
        </p>
        <br />
        <DataTable
        
        className="mi-tabla"

        />
      
    </div>
  
  );
};

export default MenuCambioCentro; */}