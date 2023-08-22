import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import ModalCargarPDFCambioCentroLISTO from "./modalCargarPDFCambioCentro";
import styled from 'styled-components';

const MenuCambioCentro = () => {
  const [NumCuenta, setNumCuenta] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
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

const tieneSolicitudesEnEspera = () => {
  console.log(filteredData);
  // Verificar si el estudiante tiene alguna solicitud "EN ESPERA"
  return filteredData.some((solicitud) => solicitud.Dictamen  === "EN ESPERA");
};

  
  const columnas = [
    {
      name: <TableHeaderCell>FECHA DE SOLICITUD</TableHeaderCell>,
      selector: (row) => row.FechaSolicitud.split("T")[0],
      cell: row => <TableHeaderCell>{row.FechaSolicitud.split("T")[0]}</TableHeaderCell>
  },
  {
      name:<TableHeaderCell>NÚMERO DE CUENTA</TableHeaderCell>,
      selector: (row) => row.NumCuenta,
      width: "300px",
      cell: row => <TableHeaderCell>{row.NumCuenta}</TableHeaderCell>
  },

{
  name: <TableHeaderCell>CENTRO AL QUE REALIZÓ LA SOLICITUD</TableHeaderCell>,
  selector: (row) => row.CentroNuevo,
  width: "300px",
  cell: row => <TableHeaderCell>{row.CentroNuevo}</TableHeaderCell>
},
  {
      name:<TableHeaderCell>DICTAMEN</TableHeaderCell>,
      selector: (row) => row.Dictamen,
      cell: row => <TableHeaderCell>{row.Dictamen}</TableHeaderCell>
  },
  {
      name: <TableHeaderCell>ESTADO</TableHeaderCell>,
      selector: (row) => row.Estado.toUpperCase(),
      cell: row => <TableHeaderCell>{row.Estado}</TableHeaderCell>
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
        <div className="container">
          <div className="d-flex align-items-center">
            <label htmlFor="centroRegional">Suba el archivo pdf que contenga la justificación del cambio de centro   </label>
            <button
              type="button"
              className="btn ml-3"
              data-bs-toggle="modal"
              data-bs-target="#ModalCAMBIO"
              disabled={tieneSolicitudesEnEspera()}
          >
            Subir archivo PDF
        </button>
          </div>


            <label htmlFor="centroRegional" className="pt-3">Seleccione el Centro regional al que desea trasladarse:</label>
            <br />
            <br />
          <select
            className="form-select border-1 w-50"
            style={{border: "1px solid #c6c6c6 ",borderRadius: "5px"}}
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


          <br />

    
          <label htmlFor="centroRegional">Despúes de asegurar sus datos de click en enviar solicitud, para que se actualicé la tabla.</label><br></br>
          <br></br>
          <button type="button" className="btn btn" onClick={handleSubmit} disabled={tieneSolicitudesEnEspera()}>
              Enviar Solicitud
          </button>


    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Solicitudes realizadas
        </h1>

            
        <label htmlFor="centroRegional">Tiene que pagar para que la solicitud sea enviada al coordinador.</label><br></br>
          <br></br>
        <DataTable
        columns={columnas}
        className="mi-tabla"
        noDataComponent={<NoDataComponent />}
        data={filteredData}
        customStyles={customStyles}
        />

    </div>
    <br>
    </br>
    <br>

    </br>
    <div className="d-flex justify-content-center">

          <ModalCargarPDFCambioCentroLISTO setPuedeEnviarPDF={setPuedeEnviarPDF}/>
        </div>

    </div>
  );
};


export default MenuCambioCentro;



