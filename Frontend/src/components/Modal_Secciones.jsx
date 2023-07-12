
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const ModalSecciones = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [IdClase, setIdClase] = useState('');
  const [Edificio, setEdificio] = useState('');
  const [Aula, setAula] = useState('');
  const [CantidadAlumnos, setCantidadAlumnos] = useState('');
  const [HI, setHI] = useState('');
  const [Seccion, setSeccion] = useState('');
  const [HF, setHF] = useState('');
  const [Periodo, setPeriodo] = useState('');
  const [Fecha, setFecha] = useState('');
  const [IdDocente, setIdDocente] = useState('');
  const [OBS, setOBS] = useState('');

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleOpcionEdificio = (event) => {
    setEdificio(event.target.value);
  };

  const handleOpcionHI = (event) => {
    setHI(event.target.value);
  };

  const handleOpcionHF = (event) => {
    setHF(event.target.value);
  };

  const handleOpcionPeriodo = (event) => {
    setPeriodo(event.target.value);
  };

  const borrarCampos = () => {
    setIdClase('');
    setEdificio('');
    setAula('');
    setCantidadAlumnos('');
    setHI('');
    setSeccion('');
    setHF('');
    setPeriodo('');
    setFecha('');
    setIdDocente('');
    setOBS('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('IdClase:', IdClase);
    console.log('Edificio:', Edificio);
    console.log('Aula:', Aula);
    console.log('CantidadAlumnos:', CantidadAlumnos);
    console.log('HI:', HI);
    console.log('Seccion:', Seccion);
    console.log('HF:', HF);
    console.log('Periodo:', Periodo);
    console.log('Fecha:', Fecha);
    console.log('IdDocente:', IdDocente);
    console.log('OBS:', OBS);

    toggleModal();
  };

  const AgregarSeccion = () => {
    const formData = new FormData();
    formData.append('idClase', IdClase);
    formData.append('edificio', Edificio);
    formData.append('aula', Aula);
    formData.append('cantidadAlumnos', CantidadAlumnos);
    formData.append('hI', HI);
    formData.append('seccion', Seccion);
    formData.append('hF', HF);
    formData.append('periodo', Periodo);
    formData.append('fecha', Fecha);
    formData.append('idDocente', IdDocente);
    formData.append('obs', OBS);

    toggleModal();
    borrarCampos();

    // Validación de la hora de inicio y hora final
    if (parseInt(HI) >= parseInt(HF)) {
      alert('La hora de inicio debe ser menor que la hora final');
      return;
    }

    // Realizar la solicitud HTTP utilizando fetch
    fetch('http://localhost:5000/registrarSecciones', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          alert('Sección agregada correctamente');
          return response;
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };

  return (
    <div>
      <div onClick={toggleModal} className="grid grid-cols-1">
        <a>
          <a
            className="rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
          >
            <span className="rounded grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span className="rounded relative text-center inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
              IR
            </span>
          </a>
        </a>
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader>CREAR UNA NUEVA SECCION</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="idclase">Codigo de la Clase</Label>
              <Input
                type="text"
                id="idclase"
                value={IdClase}
                maxLength={6}
                onChange={(e) => setIdClase(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
            <Label for="edificio">Edificio </Label>
                <Input type="select" id="edificio" value={Edificio} onChange={handleOpcionEdificio}>
                <option value="">Seleccione un Edificio</option>
                <option value="D1">D1</option>
                <option value="F1">F1</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="H1">H1</option>
                <option value="A1">A1</option>
                <option value="J1">J1</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
                <option value="C3">C3</option>
                </Input>
            </FormGroup>
            <FormGroup>
            <Label for="Aula">Aula</Label>
              <Input
                type="number"
                id="aula"
                value={Aula}
                onChange={(e) => setAula(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cantidadAlumnos">Cantidad de Alumnos</Label>
              <Input
                type="number"
                id="cantidadAlumnos"
                value={CantidadAlumnos}
                onChange={(e) => setCantidadAlumnos(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
            <Label for="hi">HI </Label>
                <Input type="select" id="hi" value={HI} onChange={handleOpcionHI}>
                <option value="">Seleccione una Hora de inicio</option>
                <option value="7000">7000</option>
                <option value="8000">8000</option>
                <option value="9000">9000</option>
                <option value="1000">1000</option>
                <option value="1100">1100</option>
                <option value="1200">1200</option>
                <option value="1300">1300</option>
                <option value="1400">1400</option>
                <option value="1500">1500</option>
                <option value="1600">1600</option>
                <option value="1700">1700</option>
                <option value="1800">1800</option>
                <option value="1900">1900</option>
                <option value="2000">2000</option>
             
                </Input>
            </FormGroup>
            <FormGroup>
              <Label for="seccion">Seccion</Label>
              <Input
                type="number"
                id="seccion"
                maxLength={4}
                value={Seccion}
                onChange={(e) => setSeccion(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
            <Label for="hf">HF </Label>
                <Input type="select" id="hf" value={HF} onChange={handleOpcionHF}>
                <option value="">Seleccione una Hora de Finalizacion</option>
                <option value="8000">8000</option>
                <option value="9000">9000</option>
                <option value="1000">1000</option>
                <option value="1100">1100</option>
                <option value="1200">1200</option>
                <option value="1300">1300</option>
                <option value="1400">1400</option>
                <option value="1500">1500</option>
                <option value="1600">1600</option>
                <option value="1700">1700</option>
                <option value="1800">1800</option>
                <option value="1900">1900</option>
                <option value="2000">2000</option>
                <option value="2100">2100</option>
                </Input>
    
            </FormGroup>
            <FormGroup>
              <Label for="periodo">Periodo</Label>
              <Input type="select" id="periodo" value={Periodo} onChange={handleOpcionPeriodo}>
                <option value="">Seleccione un Periodo</option>
                <option value="1">1 PAC</option>
                <option value="2">2 PAC</option>
                <option value="3">3 PAC</option>

                </Input>
    
            </FormGroup>
            <FormGroup>
            <Label for="fecha">Fecha De Creacion</Label>
              <Input
                type="date"
                id="fecha"
                value={Fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="idDocente">Id Docente</Label>
              <Input
                type="number"
                id="idDocente"
                value={IdDocente}
                onChange={(e) => setIdDocente(e.target.value)}
              />
                
            </FormGroup>
            <FormGroup>
              <Label for="obs">OBS</Label>
              <Input
                placeholder='Agrega una Observacion'
                type="textarea"
                id="obs"
                value={OBS}
                onChange={(e) => setOBS(e.target.value)}
              />
            </FormGroup>

     
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={AgregarSeccion}>
            Registrar
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalSecciones;
