import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import {FcInfo} from "react-icons/fc";

const ModalEvaluarDocentes = () => {
  const EstadoInicial = {
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: null,
    pregunta5: null,
    pregunta6: '',
  };

  const [preguntas, setPreguntas] = useState(EstadoInicial);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setPreguntas((prevState) => ({
        ...prevState,
        [name]: prevState[name] === value ? null : value,
      }));
    } else {
      setPreguntas((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!PreguntasContestadas()) {
      return;
    }
    console.log(preguntas);
    setPreguntas(EstadoInicial);
    toggleModal();
  };

  const PreguntasContestadas = () => {
    return (
      preguntas.pregunta1 !== '' &&
      preguntas.pregunta2 !== '' &&
      preguntas.pregunta3 !== '' &&
      preguntas.pregunta4 !== null &&
      preguntas.pregunta5 !== null &&
      preguntas.pregunta6 !== ''
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div>

      <div onClick={toggleModal} className="grid grid-cols-1">
        <div className="row">
            <FcInfo/>
        </div>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader>Ingrese los datos</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Pregunta 1:</Label>
            <Input
              type="select"
              name="pregunta1"
              value={preguntas.pregunta1}
              onChange={handleChange}
              className={preguntas.pregunta1 === '' ? 'missing-answer' : ''}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Pregunta 2:</Label>
            <Input
              type="select"
              name="pregunta2"
              value={preguntas.pregunta2}
              onChange={handleChange}
              className={preguntas.pregunta2 === '' ? 'missing-answer' : ''}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Pregunta 3:</Label>
            <Input
              type="select"
              name="pregunta3"
              value={preguntas.pregunta3}
              onChange={handleChange}
              className={preguntas.pregunta3 === '' ? 'missing-answer' : ''}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map((value) => (
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
                  checked={preguntas.pregunta4 === 'SI'}
                  onChange={handleChange}
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
                  checked={preguntas.pregunta4 === 'NO'}
                  onChange={handleChange}
                />{' '}
                No
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label>El docente proporciona la pauta de los examenes realizados:</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="pregunta5"
                  value="SI"
                  checked={preguntas.pregunta5 === 'SI'}
                  onChange={handleChange}
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
                  checked={preguntas.pregunta5 === 'NO'}
                  onChange={handleChange}
                />{' '}
                No
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label>Podría agregar cualquier observación del Docente:</Label>
            <Input
              type="textarea"
              name="pregunta6"
              value={preguntas.pregunta6}
              onChange={handleChange}
              className={preguntas.pregunta6 === '' ? 'missing-answer' : ''}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit} disabled={!PreguntasContestadas()}>
            Enviar
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalEvaluarDocentes;