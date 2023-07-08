import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';



const ModalDocentes = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [DNI, setDNI] = useState('');
  const [CorreoPersonal, setCorreoPersonal] = useState('');
  const [NumeroTelefono, setNumeroTelefono] = useState('');
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

  const borrarCampos = () => {
    setNombre('');
    setApellido('');
    setDNI('');
    setCorreoPersonal('');
    setNumeroTelefono('');
    setFechaNacimiento('');
    setDireccion('');
    setCentroRegional('');
    setFoto('');

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Nombre:', Nombre);
    console.log('Apellido:', Apellido);
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
   
      <div onClick ={toggleModal} className="grid grid-cols-1">
                <a>
                  <a
                    className="rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
                  >
                    <span className=" rounded grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span className=" rounded relative text-center inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                     IR
                    </span>
                  </a>
                </a>
      </div>
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
          <Button color="primary" onClick={AgregarDocente}>Registrar</Button>
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
          <Button color="secondary" onClick={borrarCampos}>Limpiar</Button>
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
      form.append(DNI,DNI)
      form.append(CorreoPersonal,CorreoPersonal)
      form.append(NumeroTelefono,NumeroTelefono)
      form.append(FechaNacimiento,FechaNacimiento)
      form.append(Direccion,Direccion)
      form.append(CentroRegional,CentroRegional)
      form.append(Foto,Foto)
    
      toggleModal();
      borrarCampos();

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

