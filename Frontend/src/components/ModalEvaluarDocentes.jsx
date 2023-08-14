import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import { FcInfo } from 'react-icons/fc';
const ModalEvaluarDocentes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [NumCuenta, setNumCuenta] = useState("");
  const [IdSeccion,setIdSeccion] = useState("");
  const [IdDocente,setIdDocente] = useState("");
  const [evaluationData, setEvaluationData] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: null,
    pregunta5: null,
    Observacion: '',
    IdSeccion: '', 
    IdDocente: ''  
  });
  console.log(Notas.IdDocente)
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const numCuenta = userData.data.NumCuenta;
      setNumCuenta(numCuenta);
    }
  }, []);
  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };
  const handleInputChange = e => {
    const { name, value, type } = e.target;
    setEvaluationData(prevData => ({
      ...prevData,
      [name]: type === 'radio' ? value === prevData[name] ? null : value : value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!PreguntasContestadas()) {
      return;
    }


    try {
      const response = await fetch('http://localhost:5000/subirEvaluacionDocente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          IdSeccion:Notas.IdSeccion,
          IdDocente:Notas.IdDocente,
          IdEstudiante: NumCuenta,
          Pregunta1: evaluationData.pregunta1,
          Pregunta2: evaluationData.pregunta2,
          Pregunta3: evaluationData.pregunta3,
          Pregunta4: evaluationData.pregunta4,
          Pregunta5: evaluationData.pregunta5,
          Observacion: evaluationData.Observacion,
        })
      });
      if (response.ok) {
        console.log('Evaluación enviada con éxito');
        alert("Evaluacion enviada Correctamente")
        resetForm();
        toggleModal();
      } else {
        console.error('Error al enviar la evaluación');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const PreguntasContestadas = () => {
    return (
      evaluationData.pregunta1 !== '' &&
      evaluationData.pregunta2 !== '' &&
      evaluationData.pregunta3 !== '' &&
      evaluationData.pregunta4 !== null &&
      evaluationData.pregunta5 !== null &&
      evaluationData.Observacion !== ''
    );
  };
  const resetForm = () => {
    setEvaluationData({
      pregunta1: '',
      pregunta2: '',
      pregunta3: '',
      pregunta4: null,
      pregunta5: null,
      Observacion: '',
      IdSeccion: '',   
      IdDocente: ''   
    });
  };

  const mostrarInformacion2 = (row) => {
    setSelectedRow(row);
    console.log(JSON.stringify({ IdSeccion: String(row.IDSECCION) })
    );
    toggleModal()

    //Aqui debe ir el fetch para obtener la información del docente
    fetch(`http://localhost:5000/mostrarPerfilDocente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IdSeccion: String(row.IDSECCION) }),	
    })
    .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        if (data) {
          const userData = data;
          const IdSeccion = userData.idseccion
          setIdSeccion(IdSeccion)
          const IdDocente = userData.numempleado
          setIdDocente(IdDocente)
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  return (
    <div>
      <div onClick={toggleModal} className="grid grid-cols-1">
        <div className="row">
          <FcInfo />
        </div>
      </div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader>Ingrese los datos</ModalHeader>
        <ModalHeader>
          <button className="close boton_cierre" onClick={toggleModal}>
            <span aria-hidden="true">X</span>
          </button>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>El docente ha entregado la planificación 
            de contenido y rubricas para el desarrollo de la clase, 
            siguiendo la normativa pedagógica y curricular. </Label>
            <Input
              type="select"
              name="pregunta1"
              value={evaluationData.pregunta1}
              onChange={handleInputChange}
              className={evaluationData.pregunta1 === '' ? '' : ''}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>El docente ha cumplido con los tiempos estipulados para la entrega de resultados 
            de las evaluaciones.</Label>
            <Input
              type="select"
              name="pregunta2"
              value={evaluationData.pregunta2}
              onChange={handleInputChange}
              className={evaluationData.pregunta2 === '' ? '' : ''}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>El docente se ha comportado bajo el 
            marco de la ética moral y profesional</Label>
            <Input
              type="select"
              name="pregunta3"
              value={evaluationData.pregunta3}
              onChange={handleInputChange}
              className={evaluationData.pregunta3 === '' ? '' : ''}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Proporciona retroalimentación sobre las evaluaciones realizadas:</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="pregunta4"
                  value="SI"
                  checked={evaluationData.pregunta4 === 'SI'}
                  onChange={handleInputChange}
                />{' '}
                Sí
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="pregunta4"
                  value="NO"
                  checked={evaluationData.pregunta4 === 'NO'}
                  onChange={handleInputChange}
                />{' '}
                No
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label>El docente proporciona la pauta de los exámenes realizados:</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="pregunta5"
                  value="SI"
                  checked={evaluationData.pregunta5 === 'SI'}
                  onChange={handleInputChange}
                />{' '}
                Sí
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="pregunta5"
                  value="NO"
                  checked={evaluationData.pregunta5 === 'NO'}
                  onChange={handleInputChange}
                />{' '}
                No
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label>Observacion:</Label>
            <Input
              type="textarea"
              name="Observacion" 
              value={evaluationData.Observacion} 
              onChange={handleInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit} disabled={!PreguntasContestadas()} >
          Enviar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalEvaluarDocentes;
