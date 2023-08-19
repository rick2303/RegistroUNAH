import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { Input } from "reactstrap";
import styled from 'styled-components';

const opcionesPaginacion = {
  pagination: {
    previous: "Anterior",
    next: "Siguiente",
    rowsPerPage: "Filas por página:",
    displayRows: "de",
    paginationLabel: "{start}-{end} de {rows} páginas",
  },
};
const MenuHistorialAdmin = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const showData = async (NumCuenta) => {
    const URL = "http://localhost:5000/historial";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ NumCuenta }),
    });
    const data = await response.json();
   // console.log(data);
    setUsers(data);
  };
  useEffect(() => {
    showData(inputValue);
  }, [inputValue]); // Ejecutar el efecto cada vez que inputValue cambie
  //configuramos las columnas para DataTable

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

  const columnas = [
    {
      name: <TableHeaderCell>CÓDIGO</TableHeaderCell>,
      selector: (row) => row.CODIGO,
      cell: row => <TableHeaderCell>{row.CODIGO}</TableHeaderCell>
    },
    {
      name: "ASIGNATURA", 
      selector: (row) => row.ASIGNATURA,
      width: "18%",
    },
    {
      name: "SECCIÓN",
      selector: (row) => row.SECCION,
      center:true,
    },
    {
      name: "UV",
      selector: (row) => row.UV,
      center:true,
    },

    {
      name: "AÑO",
      selector: (row) => row.Año,
      center:true,
    },
    {
      name: "PERÍODO",
      selector: (row) => row.PERIODO,
      center:true,
    },
    {
      name: "CALIFICACIÓN",
      selector: (row) => row.CALIFIACION,
      center:true,
    },
    {
      name: "OBS",
      selector: (row) => row.OBS,
    },
  ];

  //Mostramos la data en DataTable
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  return (
    <div className="App">
      <div className="container ">
      <div className="row">
      <div>
        <Input
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "30px",
            maxWidth: "300px",
            border: "1px solid #c6c6c6 ",
            borderRadius: "5px"
          }}
          id="inputCuenta"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ingresar número de cuenta"
        />
      </div>
      <DataTable columns={columnas} data={users} pagination options={opcionesPaginacion} 
      customStyles={customStyles}
      noDataComponent={<NoDataComponent />}></DataTable>
    </div>
    </div>
    </div>
  );
};
export default MenuHistorialAdmin;