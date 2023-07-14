import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components';
import { Button } from "reactstrap";


const opcionesPaginacion = {
  pagination: {
    previous: "Anterior",
    next: "Siguiente",
    rowsPerPage: "Filas por página:",
    displayRows: "de",
    paginationLabel: "{start}-{end} de {rows} páginas",
  },
};

const MenuHistorial = () => {
  const [NumCuenta, setNumCuenta] = useState("");
  const [historialData, setHistorialData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const numCuenta = userData.data.NumCuenta;
      setNumCuenta(numCuenta);
    }
  }, []);

  useEffect(() => {
    if (NumCuenta) {
      showData(NumCuenta);
    }
  }, [NumCuenta]);

  const showData = async (cuenta) => {
    const URL = "http://localhost:5000/historial";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ NumCuenta: cuenta }),
    });
    const data = await response.json();
    console.log(data);
    setHistorialData(data);
  };
  
  const descargarHistorial = async () => {
    const URL = `http://localhost:5000/historialPDF/${NumCuenta}`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const buffer = await response.arrayBuffer();
    const blob = new Blob([buffer], { type: "application/pdf" });
  
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `Historial-${NumCuenta}.pdf` // Nombre del archivo PDF que se descargará
    a.click();
  
    // Limpia la URL y elimina el objeto Blob
    window.URL.revokeObjectURL(url);
  };
  
  
  const handleButtonClick = () => {
    descargarHistorial();
  };
  // Configuramos las columnas para DataTable
  const columnas = [
    {
      name: "CODIGO",
      selector: (row) => row.CODIGO,
    },
    {
      name: "ASIGNATURA",
      selector: (row) => row.ASIGNATURA,
    },
    {
      name: "UV",
      selector: (row) => row.UV,
    },
    {
      name: "SECCION",
      selector: (row) => row.SECCION,
    },
    {
      name: "AÑO",
      selector: (row) => row.Año,
    },
    {
      name: "PERIODO",
      selector: (row) => row.PERIODO,
    },
    {
      name: "CALIFICACION",
      selector: (row) => row.CALIFIACION,
    },
    {
      name: "OBS",
      selector: (row) => row.OBS,
    },
  ];

  // Mostramos la data en DataTable
  return (
    
    <div className="App">
      <div style={{ marginLeft: "30px", marginTop: "20px" }}>
        <Button onClick={handleButtonClick} color="primary">
          Descargar Historial
        </Button>
      </div>
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
          Historial Académico
      </h1>
      <DataTable columns={columnas} data={historialData} pagination options={opcionesPaginacion} />
    </div>
  );
};

export default MenuHistorial;
