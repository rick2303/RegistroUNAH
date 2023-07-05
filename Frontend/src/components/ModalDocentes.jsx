import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';



const ModalDocentes = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Carrera, setCarrera] = useState('');
  const [DNI, setDNI] = useState("");
  const [CorreoPersonal, setCorreoPersonal] = useState('');
  const [NumeroTelefono, setNumeroTelefono] = useState("");
  const [FechaNacimiento, setFechaNacimiento] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [CentroRegional, setCentroRegional] = useState('');
  const [Foto, setFoto] = useState('');
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleOpcionChange = (event) => {
    setCentroRegional(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Nombre:', Nombre);
    console.log('Apellido:', Apellido);
    console.log('Carrera:', Carrera);
    console.log('DNI:', DNI);
    console.log('CorreoPersonal:', CorreoPersonal);
    console.log('NumeroTelefono:', NumeroTelefono);
    console.log('FechaNacimiento:', FechaNacimiento);
    console.log('Direccion:', Direccion);
    console.log('CentroRegional:', CentroRegional);
    console.log('Foto:', Foto);

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
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input
                type="text"
                id="apellido"
                value={Apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="carrera">Carrera</Label>
              <Input
                type="text"
                id="carrera"
                value={Carrera}
                onChange={(e) => setCarrera(e.target.value)}
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
              <Label for="email">Correo Personal</Label>
              <Input
                type="email"
                id="email"
                value={CorreoPersonal}
                onChange={(e) => setCorreoPersonal(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numCelular">Numero De Celular</Label>
              <Input
                type="number"
                id="numCelular"
                value={NumeroTelefono}
                onChange={(e) => setNumeroTelefono(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fechaNacimiento">Fecha De Nacimiento</Label>
              <Input
                type="date"
                id="fechaNacimiento"
                value={FechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="direccion">Direccion</Label>
              <Input
                type="textarea"
                id="direccion"
                value={Direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </FormGroup>
            <FormGroup>

            <Label for="centroRegional">Centro Regional:</Label>
                <Input type="select" id="centroRegional" value={CentroRegional} onChange={handleOpcionChange}>
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
            <FormGroup>
              <Label for="foto">Foto</Label>
              <Input
                type="file"
                id="foto"
                value={Foto}
                onChange={(e) => setFoto(e.target.value)}
                accept='.jpg,.pgn,.png'
              />
            </FormGroup>
    

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={AgregarDocente}>Registrar</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>

    
  );
};

//fetch al backend

const AgregarDocente = (event) => {
    event.preventDefault();
  

    const formData = {
      Nombre : Nombre,
      Apellido: Apellido,
      Carrera:Carrera,
      DNI: DNI,
      CorreoPersonal: CorreoPersonal,
      NumeroTeleforno: NumeroTelefono,
      FechaNacimiento: FechaNacimiento,
      Direccion: Direccion,
      CentroRegional: CentroRegional,
      Foto: Foto
    };
    
    const form = new formData();

      form.append(Nombre,Nombre)
      form.append(Apellido,Apellido)
      form.append(Carrera,Carrera)
      form.append(DNI,DNI)
      form.append(CorreoPersonal,CorreoPersonal)
      form.append(NumeroTelefono,NumeroTelefono)
      form.append(FechaNacimiento,FechaNacimiento)
      form.append(Direccion,Direccion)
      form.append(CentroRegional,CentroRegional)
      form.append(Foto,Foto)
    
      toggleModal();

    // Realizar la solicitud HTTP utilizando fetch
    fetch('http://localhost:5000/...', {
      method: 'POST',
      body: form,
    })

      .then((response)=> {
        if (response.status===200){
          alert("Docente agregado correctamente");
          return response;
        }
      })
      .finally(error => {
        console.error('Error en la solicitud:', error);
      });
  };

export default ModalDocentes;

