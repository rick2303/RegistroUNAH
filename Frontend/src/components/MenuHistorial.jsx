import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components';

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
            <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
                Historial Académico
            </h1>
      <DataTable columns={columnas} data={historialData} pagination />
    </div>
  );
};

export default MenuHistorial;
