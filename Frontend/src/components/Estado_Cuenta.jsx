import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const EstadoCuenta = () => {
  const [modal, setModal] = useState(false);
  const [Data, setData] = useState([]);
  const [NumeroCuenta, setNumeroCuenta] = useState('');

  useEffect(() => {
    const storedNumeroCuenta = localStorage.getItem('userData');
    if (storedNumeroCuenta) {
      setNumeroCuenta(storedNumeroCuenta);
    }
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      fetchTable();
    }
  };

  const fetchTable = () => {
    fetch(`http://localhost:5000/estadoCuenta`)
      .then(response => response.json())
      .then(data => setStudentData(data))
      .catch(error => console.error('Error en envio de datos:', error));
  };

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('numCuenta', NumeroCuenta);
    toggleModal();
  };

  return (
    <div>
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
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Estado de Cuenta</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
          </form>
          <Table>
            <thead>
              <tr>
                <th>Tipo de pago</th>
                <th>Periodo</th>
                <th>Monto</th>
                <th>Estado</th>
    
              </tr>
            </thead>
            <tbody>
              {Data.map(pago => (
                <tr key={pago.idPago}>
                  <td>{pago.Estado}</td>
                  <td>{pago.Monto}</td>
                  <td>{pago.FechaPago}</td>
                  <td>{pago.FechaPago}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};


export default EstadoCuenta;
