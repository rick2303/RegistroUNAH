import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';


const MenuEvaluarDocentes = () => {
  const [preguntas, setPreguntas] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: null,
    pregunta5: null,
    pregunta6: '',
  });

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
    
    console.log(preguntas);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <legend>Preguntas de calificación del 1-5 mediante puntaje:</legend>
          <FormGroup>
            <Label>El docente ha entregado la planificación de contenido y rubricas para el desarrollo de la clase, siguiendo la normativa pedagógica y curricular:</Label>
            <Input
              type="select"
              name="pregunta1"
              value={preguntas.pregunta1}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>El docente ha cumplido con los tiempos estipulados para la entrega de resultados de las evaluaciones:</Label>
            <Input
              type="select"
              name="pregunta2"
              value={preguntas.pregunta2}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>El docente se ha comportado bajo el marco de la ética moral y profesional:</Label>
            <Input
              type="select"
              name="pregunta3"
              value={preguntas.pregunta3}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Input>
          </FormGroup>
        </FormGroup>
        

        <FormGroup>
          <legend>Preguntas de selección:</legend>

          <Label>Proporciona retroalimentación sobre las evaluaciones realizadas:</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="pregunta4"
                value="true"
                checked={preguntas.pregunta4 === 'true'}
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
                value="false"
                checked={preguntas.pregunta4 === 'false'}
                onChange={handleChange}
              />{' '}
              No
            </Label>
          </FormGroup>
          <br />

          <Label>El docente proporciona la pauta de los examenes realizados:</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="pregunta5"
                value="true"
                checked={preguntas.pregunta5 === 'true'}
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
                value="false"
                checked={preguntas.pregunta5 === 'false'}
                onChange={handleChange}
              />{' '}
              No
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
        <legend>OBS:</legend>
          <Label>Podría agregar cualquier observación que considere pertinente para la correcta evaluación del docente y las sugerencias que se le puedan dar al mismo:</Label>
          <Input
            type="textarea"
            name="pregunta6"
            value={preguntas.pregunta6}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit" color="primary">Enviar</Button>
      </Form>
    </Container>
  );
};

export default MenuEvaluarDocentes;