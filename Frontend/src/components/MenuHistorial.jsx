import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components';
import { Button } from "reactstrap";
import styled from 'styled-components';

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
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
  
  const handleButtonClick = () => {
    descargarHistorial();
  };
  // Configuramos las columnas para DataTable
  const columnas = [
    {
      name: <TableHeaderCell>CÓDIGO</TableHeaderCell>,
      selector: (row) => row.CODIGO,
      cell: row => <TableHeaderCell>{row.CODIGO}</TableHeaderCell>
    },
    {
      name: "ASIGNATURA",
      selector: (row) => row.ASIGNATURA,
    },
    {
      name: <TableHeaderCell>UV</TableHeaderCell>,
      selector: (row) => row.UV,
      cell: row => <TableHeaderCell>{row.UV}</TableHeaderCell>
    },
    {
      name: "SECCIÓN",
      selector: (row) => row.SECCION,
    },
    {
      name: "AÑO",
      selector: (row) => row.Año,
    },
    {
      name: "PERÍODO",
      selector: (row) => row.PERIODO,
    },
    {
      name: "CALIFICACIÓN",
      selector: (row) => row.CALIFIACION,
      cell: row => <div style={{ marginLeft:"30px" }}>{row.CALIFIACION}</div>,
    },
    {
      name: "OBS",
      selector: (row) => row.OBS,
    },
  ];
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  // Mostramos la data en DataTable
  return (
    
    <div className="App">
        <div className="container ">
    <div className="row">
      <div style={{ marginLeft: "30px", marginTop: "20px" }}>
        <Button onClick={handleButtonClick} color="primary">
          Descargar Historial
        </Button>
      </div>
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
          Historial Académico
      </h1>
      <DataTable 
      columns={columnas} 
      data={historialData} pagination paginationComponentOptions={paginationComponentOptions} 
      noDataComponent={<NoDataComponent />} 
      customStyles={customStyles}/>
    </div>
    </div>
    </div>
  );
};

export default MenuHistorial;
