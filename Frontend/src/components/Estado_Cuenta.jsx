import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const StudentModal = () => {
  const [modal, setModal] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    const storedAccountNumber = localStorage.getItem('accountNumber');
    if (storedAccountNumber) {
      setAccountNumber(storedAccountNumber);
    }
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      fetchDataAndRenderTable();
    }
  };


  const fetchInfoAndCarreras = async () => {
    try {
        const [infoRes, carrerasRes, soliRes] = await Promise.all([
        fetch("http://localhost:5000/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ NumCuenta: NumCuenta }),
        }),
        fetch("http://localhost:5000/carreras"),
        fetch("http://localhost:5000/ObtenerSolicitudCambioCarrera", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ NumCuenta: NumCuenta }),
        }),
        ]);
    
        const infoData = await infoRes.json();
        const carrerasData = await carrerasRes.json();
        const soliData = await soliRes.json();
    
        setInfoEstudiante(infoData);
        setFilteredData(soliData);
        // Eliminar duplicados utilizando un Set y luego convertirlo nuevamente a un array
        const carrerasUnicas = Array.from(new Set(carrerasData));
        setCarreras(carrerasUnicas);
        setCentro(infoData[0].CentroRegional);
        setIndiceGlobal(infoData[0].IndiceGlobal);
        setPuntajePAA(infoData[0].PuntajePAA);
        console.log(infoData);
        // Manejar los datos de la solicitud obtenidos de soliData, por ejemplo:
        console.log(soliData);
    
    } catch (error) {
        console.error("Error al obtener datos de carreras o información del estudiante:", error);
    }
    };

  const handleInputChange = event => {
    setAccountNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('accountNumber', accountNumber);
    toggleModal();
  };

  return (
    <div>
      <Button color="primary" onClick={toggleModal}>
        Open Modal
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Student Account Status</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <label>Enter Account Number:</label>
            <input type="text" value={accountNumber} onChange={handleInputChange} />
            <Button color="primary" type="submit">
              Submit
            </Button>
          </form>
          <Table>
            <thead>
              <tr>
                <th>Estado</th>
                <th>Monto</th>
                <th>Fecha de Pago</th>
                {/* Add more table headers for other data fields as needed */}
              </tr>
            </thead>
            <tbody>
              {studentData.map(payment => (
                <tr key={payment.idPago}>
                  <td>{payment.Estado}</td>
                  <td>{payment.Monto}</td>
                  <td>{payment.FechaPago}</td>
                  {/* Add more table cells for other data fields as needed */}
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

export default StudentModal;