
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DataTable from 'react-data-table-component';

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


  const columns = [
    {
      name: "Tipo de pago",
      selector: (row) => row.TipoPago,
    },

    {
      name: "Periodo",
      selector: (row) => row.Periodo,
    },

    {
      name: "Monto",
      selector: (row) => row.Monto,
    },
    {
      name: "Estado",
      selector: (row) => row.Estado,
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
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Estado Cuenta</ModalHeader>
        <ModalBody>
          <DataTable
            columns={columns}
            data={users}
            noDataComponent={<NoDataComponent />}
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












{/*
const EstadoCuenta = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [numeroCuenta, setNumeroCuenta] = useState('');

  useEffect(() => {
    const storedNumeroCuenta = localStorage.getItem('userData');
    if (storedNumeroCuenta) {
      setNumeroCuenta(storedNumeroCuenta);
    }
  }, []);

  const toggleModal = () => {
    if (!modal) {
      handleEnviarData();
    }
    setModal(!modal);
  };

  const handleEnviarData = async () => {
    try {
      const response = await fetch("http://localhost:5000/estadoCuenta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numCuenta: numeroCuenta }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('userData', numeroCuenta);
    toggleModal();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={numeroCuenta}
          onChange={(e) => setNumeroCuenta(e.target.value)}
          placeholder="Ingrese el número de cuenta"
        />
        <button onClick={toggleModal}>Ver Estado de Cuenta</button>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Estado de Cuenta</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Tipo de pago</th>
                <th>NumCuenta</th>
                <th>Periodo</th>
                <th>FechaPago</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.map(pago => (
                <tr key={pago.idPago}>
                  <td>{pago.TipoPago}</td>
                  <td>{pago.NumCuenta}</td>
                  <td>{pago.Periodo}</td>
                  <td>{pago.FechaPago}</td>
                  <td>{pago.Monto}</td>
                  <td>{pago.Estado}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EstadoCuenta;
*/}