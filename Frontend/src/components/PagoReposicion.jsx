import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import styled from 'styled-components';

const MenuPagoReposicion = () => {
  const [NumCuenta, setNumCuenta] = useState("");
  const [Sistema, setsistema] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [Data, SetData] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const numCuenta = userData.data.NumCuenta;
      const sistema = userData.data.Sistema;
      setNumCuenta(numCuenta);
      setsistema(sistema);
      console.log(sistema);
    }
    obtenerSolcitudes();
  }, [Data]);

  const obtenerSolcitudes = async ()=> {
    try {
        const URL = "http://localhost:5000/SolicitudesReposicion";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                NumCuenta: NumCuenta,
            }),
            });
            const data = await response.json();
            SetData(data);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
};

const enviarSolicitud = async () => {
    const motivo = document.getElementById("solicitud").value;
    console.log(motivo);

    // Enviar solicitud al backend
    fetch("http://localhost:5000/subirSolicitud", {
      method: "POST",
      body: JSON.stringify({NumCuenta:NumCuenta,Justificacion:inputValue, Sistema: Sistema}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Solicitud procesada exitosamente");
        window.location.reload();
      });
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


  const columnas1 = [
    {
        name: "ID SOLICITUD",
        selector: (row) => row.IdSolicitud,
        center: true,  
    },
    {
      name: "FECHA DE SOLICITUD",
      selector: (row) => row.FechaSolicitud.split("T")[0],
      center: true,  
    },
    {
      name: "NÚMERO DE CUENTA",
      selector: (row) => row.NumCuenta,
      center: true,  
    },
    {
      name: "JUSTIFICACIÓN",
      selector: (row) => row.Justificacion,
    },
    {
      name: "PERÍODO",
      selector: (row) => row.Periodo,
      center: true,  
    },
    ];
    const NoDataComponent = () => {
        return <div>No hay solicitudes para mostrar</div>;
    };


  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-3 text-gray-900 sm:text-3xl">
        Pago De Reposición
      </h1>
      <div className="container">
        <br />
        <p className="text-xl font-normal pt-2 pb-3 text-gray-900 sm:text-1xl text-left">
          Coloque el motivo de porqué hará reposición
        </p>

        <div className="d-flex align-items-center">
          <div className="mb-2 me-2 w-75">
            <textarea
              className="form-control form-control-sm border border-2 p-4 rounded"
              id="solicitud"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={enviarSolicitud}
            >
              Enviar Solicitud
            </button>
          </div>

          
        </div>
        <h1 className="text-2xl text-center font-bold pt-4 pb-3 text-gray-900 sm:text-3xl">
            Solicitudes de Reposición
        </h1>
        <p className="text-xl font-normal pt-2 pb-3 text-gray-900 sm:text-1xl text-left">
            Realizar el pago correspondiente a la reposición que aparece en el estado de cuenta.
        </p>
          <br />
          <DataTable
          columns={columnas1}
          className="mi-tabla"
          data={Data}
          noDataComponent={<NoDataComponent />}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default MenuPagoReposicion;