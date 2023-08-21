
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const EstadoCuenta = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [NumCuenta, setNumCuenta] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  
  const showData = async () => {
    try {
      const URL = "http://localhost:5000/estadoCuenta";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numCuenta: NumCuenta }),
      });

      if (!response.ok) {
        throw new Error("error");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

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
      showData(); 
    }
  }, [NumCuenta]);

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

  const columns = [
    {
      name: "TIPO DE PAGO",
      selector: (row) => row.TipoPago,
      width: "35%",
      
    },

    {
      name: "PERÍODO",
      selector: (row) => row.Periodo,
      width:"20%",
    },

    {
      name: "MONTO",
      selector: (row) => row.Monto,
      width:"20%",
    },
    {
      name: "ESTADO",
      selector: (row) => row.Estado,
      width:"30%",
    },
  ];

  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };

  return (



    <div onClick={toggleModal} className="grid grid-cols-1">

    <a>
      <a className="rounded grid grid-cols-1 group relative focus:outline-none focus:ring">
        <span
          className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
          style={{ backgroundColor: "#145eb9" }}
        ></span>

        <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
          Ir
        </span>
      </a>
    </a>

      <Modal isOpen={modal} toggle={toggleModal} >
    <ModalHeader>ESTADO DE CUENTA</ModalHeader>
    <ModalBody   >
        <DataTable
            columns={columns}
            data={users}
            noDataComponent={<NoDataComponent />}
            customStyles={customStyles}
        />
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
                Cerrar
            </Button>
        </ModalFooter>
    </Modal>

    </div>
  );
};

export default EstadoCuenta;

