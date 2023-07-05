import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';



const ModalDocentes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [DNI, setDNI] = useState("");
  const [email, setEmail] = useState('');
  const [numCelular, setnumCelular] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [centroRegional, setCentroRegional] = useState('');


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleOpcionChange = (event) => {
    setCentroRegional(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log('Nombre:', nombre);
    // console.log('Apellido:', apellido);
    // console.log('DNI:', DNI);
    // console.log('Email:', email);
    // console.log('numCelular:', numCelular);
    // console.log('fechaNacimiento:', fechaNacimiento);
    // console.log('direccion:', direccion);
    // console.log('centroRegional:', centroRegional);
 
 

    toggleModal();
  };

  return (
    <div>
      <Button color='primary' size='lg' className='w-100'  onClick ={toggleModal}>IR</Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader>REGISTRAR DOCENTES</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="DNI">DNI</Label>
              <Input
                type="number"
                id="DNI"
                value={DNI}
                onChange={(e) => setDNI(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numCelular">Numero De Celular</Label>
              <Input
                type="number"
                id="numCelular"
                value={numCelular}
                onChange={(e) => setnumCelular(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fechaNacimiento">Fecha De Nacimiento</Label>
              <Input
                type="date"
                id="fechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="direccion">Direccion</Label>
              <Input
                type="textarea"
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
            <Label for="centroRegional">Centro Regional:</Label>
                <Input type="select" id="centroRegional" value={centroRegional} onChange={handleOpcionChange}>
                <option value="">Seleccione un Centro Regional</option>
                <option value="Ciudad Universitaria">Ciudad Universitaria</option>
                <option value="Valle de Sula">Valle de Sula</option>
                <option value="CURC">CURC</option>
                <option value="CURNO">CURNO</option>
                <option value="CURLA">CURLA</option>
                <option value="CURLP">CURLP</option>
                <option value="TEC-DANLI">TEC-DANLI</option>
                <option value="TEC-AGUAN">TEC-AGUAN</option>
                </Input>
            </FormGroup>
    
         
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Registrar</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

//fetch al backend


const handleSubmit = (event) => {
    event.preventDefault();
  

    const formData = {
      nombre: nombre,
      apellido: apellido,
      DNI: DNI,
      email: email,
      numCelular: numCelular,
      fechaNacimiento: fechaNacimiento,
      direccion: direccion,
      centroRegional: centroRegional

    };
  

    // Realizar la solicitud HTTP utilizando fetch
    fetch('http://localhost:5000/registrarDocentes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {

        console.log('Respuesta del backend:', data);
  
        toggleModal();
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  };

export default ModalDocentes;


