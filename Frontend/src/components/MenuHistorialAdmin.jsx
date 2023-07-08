import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { Input } from "reactstrap";

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

  //Mostramos la data en DataTable

  return (
    <div className="App">
      <div>
        <Input
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginLeft: "30px",
            maxWidth: "300px",
          }}
          id="inputCuenta"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ingresar número de cuenta"
        />
      </div>

  
      <DataTable columns={columnas} data={users} pagination></DataTable>
    </div>
  );
};

export default MenuHistorialAdmin;
