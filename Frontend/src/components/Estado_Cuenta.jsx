import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const EstadoCuenta = () => {
  const [modal, setModal] = useState(false);
  const [Data, setData] = useState([]);
  const [numCuenta, setnumCuenta] = useState('');

  useEffect(() => {
    const numCuenta = localStorage.getItem('userData');
    if (numCuenta) {
      setnumCuenta(numCuenta);
    }
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      fetchData();
    }
  };

  const fetchData = () => {
    fetch(`http://localhost:5000/estadoCuenta`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error al cargar los datos', error));
  };

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('numCuenta', numCuenta);
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
          <Table>
            <thead>
              <tr>
                <th>Tipo de pago</th>
                <th>Periodo</th>
                <th>Fecha de Pago</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {Data.map(pago => (
                <tr key={pago.numCuenta}>
                  <td>{pago.TipoPago}</td>
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
          <Button color="secondary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EstadoCuenta;