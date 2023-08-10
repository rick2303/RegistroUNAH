import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FcFinePrint,FcInfo} from "react-icons/fc";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import "../Perfil_estudiante.css";
import "styled-components";
import { format, parseISO, set } from "date-fns";
import "../App.css";
import "../Evaluacionmodal.css"


const Notas = () => {
  const [IdSeccion,setIdSeccion] = useState('');
  const [IdDocente,setIdDocente] = useState('');
  const [NumCuenta, setNumCuenta] = useState('');
  const [historialData, setHistorialData] = useState([]);
  const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const fechaActual = new Date();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const año = fechaActual.getFullYear();
  const [nombre, setNombre] = useState("");
  const [centroRegional, setCentroRegional] = useState("");
  const [correoInstitucional, setCorreoInstitucional] = useState("");
  const [correoPersonal, setCorreoPersonal] = useState("");
  const [carrera, setCarrera] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [video, setVideo] = useState("");
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



  const mostrarInformacion2 = (row) => {
    setSelectedRow(row);
    toggleModal2();
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
        console.log("UserData:", userData);
        const IdSeccion = userData.idseccion;
        console.log("IdSeccion:", IdSeccion);
        setIdSeccion(IdSeccion);
        const IdDocente = userData.numempleado;
        console.log("IdDocente:", IdDocente);
        setIdDocente(IdDocente);
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
  };
  



  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const numCuenta = userData.data.NumCuenta;
      setNumCuenta(numCuenta);
    }
  }, []);

  const toggleModal2 = () => {
    setIsModalOpen2(prevState => !prevState);
  };

  const handleInputChange2 = e => {
    const { name, value, type } = e.target;

    setEvaluationData(prevData => ({
      ...prevData,
      [name]: type === 'radio' ? value === prevData[name] ? null : value : value
    }));
  };

  const handleSubmit2 = async e => {
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
          IdSeccion: IdSeccion,
          IdDocente: IdDocente,
          IdEstudiante: NumCuenta,
          Pregunta1: evaluationData.pregunta1,
          Pregunta2: evaluationData.pregunta2,
          Pregunta3: evaluationData.pregunta3,
          Pregunta4: evaluationData.pregunta4,
          Pregunta5: evaluationData.pregunta5,
          Observacion: evaluationData.Observacion,
        })
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        console.log('Evaluación enviada con éxito');
        alert("Evaluacion enviada Correctamente");
        resetForm();
        toggleModal2();
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
      Observacion: ''
    });
  };


  const obtenerFechasMinMaxIPAC = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/enviarPlanificacionIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
        setPeriodoAcademicoActualPAC("1PAC");
      }
    } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    }
  };
  const obtenerFechasMinMaxIIPAC = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/enviarPlanificacionIIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
        setPeriodoAcademicoActualPAC("2PAC");
      }
    } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    }
  };
  const obtenerFechasMinMaxIIIPAC = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/enviarPlanificacionIIIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
        setPeriodoAcademicoActualPAC("3PAC");
      }
    } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
    }
  };
  obtenerFechasMinMaxIPAC();
  obtenerFechasMinMaxIIPAC();
  obtenerFechasMinMaxIIIPAC();

  useEffect(() => {
    if (NumCuenta && periodoAcademicoActual && año) {
      showData(NumCuenta, periodoAcademicoActual, año);
    }
    console.log(periodoAcademicoActual);
  }, [NumCuenta, periodoAcademicoActual, año]);
  const showData = async (cuenta, periodo, year) => {
    try {
      const URL = "http://localhost:5000/enviarClasesQueEstaCursando";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NumCuenta: cuenta,
          Periodo: periodo,
          año: year,
        }),
      });
      const data = await response.json();3
      console.log(data);
      setHistorialData(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  // Configuramos las columnas para DataTable
  const columnas1 = [
    {
      name: "CODIGO",
      selector: (row) => row.CODIGO,
      center: true,
    },
    {
      name: "ASIGNATURA",
      selector: (row) => row.ASIGNATURA,
      center: true,
    },
    {
      name: "SECCION",
      selector: (row) => row.SECCION,
      center: true,
    },
    
    {
      name: "PERIODO",
      selector: (row) => row.PERIODO,
      center: true,
    },

    {
      name: "EVALUACIÓN DOCENTE",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion2(row)}>
          <FcInfo />
        </h1>
      ),
      center: true,
    },
    {
      name: "NOTA FINAL",
      selector: (row) => row.OBS,
      center: true,
    },
    
    {
      name: "PERFIL DOCENTE",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcFinePrint />
        </h1>
      ),
      center: true,
    },
  ];
  const mostrarInformacion = (row) => {
    setSelectedRow(row);
    console.log(JSON.stringify({ IdSeccion: String(row.IDSECCION) })
    );
    toggleModal();
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
          console.log(userData);
          console.log(userData.nombre);
          const nombre = userData.nombre + " " + userData.apellido;
          setNombre(nombre);
          const centroRegional = userData.centroregional;
          setCentroRegional(centroRegional);
          const correoInstitucional = userData.correoinstitucional;
          setCorreoInstitucional(correoInstitucional);
          const correoPersonal = userData.correopersonal;
          setCorreoPersonal(correoPersonal);
          const carrera = userData.carrera;
          setCarrera(carrera);
          const descripcion = userData.descripcion;
          setDescripcion(descripcion);


          if(!userData.imagen1 || !userData.video ){
            const imagen = '../1688323336413-804346209-64572.png';
            setImagen(imagen);
            const video = '../Video docente.mp4';
            setVideo(video);
          }else{
            const imagen = userData.imagen1;
            setImagen(imagen);
            const video = userData.video;
            setVideo(video);
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
    /* const storedData = localStorage.getItem("userData"); */
    }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setNombre("");
    setCentroRegional("");
    setCorreoInstitucional("");
    setCorreoPersonal("");
    setCarrera("");
    setDescripcion("");
    const imagen = '../1688323336413-804346209-64572.png';
    setImagen(imagen);
    const video = '../Video docente.mp4';
    setVideo(video);

  };

  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Notas Actuales
      </h1>
      <div className="container">
        <DataTable
         className="mi-tabla"
         columns={columnas1} 
         data={historialData} 
          noDataComponent={<NoDataComponent />}></DataTable>
      </div>
      {selectedRow && (
        <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-fullscreen"> {/* Agregar la clase 'modal-fullscreen' */}
          <ModalHeader className="text-white bg-blue-800 text-2xl">
            <strong>Perfil de docente</strong>
            <button className="close boton_cierre" onClick={toggleModal}>
              <span aria-hidden="true">X</span>
            </button>
          </ModalHeader>
          <ModalBody>
          <>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class=" d-flex justify-content-center">
            <div class=" col-md-12">
              <div class="card user-card-full h-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-6 col-md-2  bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div
                        id="myCarousel"
                        class="carousel slide"
                        data-ride="carousel"
                      >
                        {/*   <!-- Slides --> */}
                        <div
                          id="carouselExampleInterval"
                          class="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div class="carousel-inner ">
                            <div
                              class="carousel-item active rounded-photo"
                              data-bs-interval="10000"
                            >
                              <img
                                src={`../img/uploads/${imagen}`}
                                class=" d-block-docente w-100"
                                alt="Sin foto de perfil"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4 class="f-w-600 text-xl">Descripción:</h4>
                      <div>
                      <h6>{descripcion}</h6> 
                      </div>
{/* 
                      <div class="d-flex justify-content-center align-items-center">
                        <a data-bs-toggle="modal" data-bs-target="#example">
                          <h2 class="m-2">
                            <MdAddAPhoto
                              className="text-2xl fas fa-pencil-alt cursor-pointer"
                              title="foto de perfil"
                            />
                          </h2>
                        </a>
                        <ModalCargarFotos />
                      </div> */}
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-10">
                    <div class="card-block">
                      <h5 className="m-b-20 p-b-5 b-b-default f-w-600 row">
                      <label className="col-12">Información general</label>
                        {/* <div class="d-flex justify-content-end col-6">
                          <a
                            href="../html/Docente.html"
                            className="text-end fas fa-pencil-alt"
                            title="Regresar"
                          ><label>
                            <TiArrowBackOutline className="cursor-pointer" />
                            </label>
                          </a>
                        </div> */}
                      </h5>
                      <div class="row mb-4">
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Nombre:</hatch>
                          <h6 class="text-muted f-w-400">{nombre}</h6>
                        </div>
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Correo Institucional:</hatch>
                          <h6 class="text-muted f-w-400">
                            {correoInstitucional}
                          </h6>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Centro regional:</hatch>
                          <h6 class="text-muted f-w-400">{centroRegional}</h6>
                        </div>
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Carrera:</hatch>
                          <h6 class="text-muted f-w-400">{carrera}</h6>
                        </div>
                      </div>
                      <div class="row mb-4">
                      <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Correo Personal:</hatch>
                          <h6 class="text-muted f-w-400">
                            {correoPersonal}
                          </h6>
                        </div>
                      </div>
                      <h5 className="m-b-20 mt-9 p-b-5 b-b-default f-w-600 row">
                        <label className="col-12">Video descriptivo</label>
                        {/* <div class="d-flex justify-content-end col-6">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#docente"
                            className="text-end fas fa-pencil-alt"
                            title="Cargar video"
                          >
                            <label><AiOutlineVideoCameraAdd className="cursor-pointer" /></label>
                          </a>
                          <ModalCargarVideo />
                        </div> */}
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <video src={`../img/uploads/${video}`} controls width="47%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
          </ModalBody>
        </Modal>
      )}
      <div>

      <Modal isOpen={isModalOpen2} toggle={mostrarInformacion2} className="evaluacionmodal">
        <ModalHeader>EVALUACION DOCENTES</ModalHeader>
        <ModalHeader>
          <button className="close boton_cierre" onClick={mostrarInformacion2}>
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
              onChange={handleInputChange2}
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
              onChange={handleInputChange2}
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
              onChange={handleInputChange2}
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
                  onChange={handleInputChange2}
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
                  onChange={handleInputChange2}
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
                  onChange={handleInputChange2}
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
                  onChange={handleInputChange2}
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
              onChange={handleInputChange2}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit2} disabled={!PreguntasContestadas()} style={{ backgroundColor: '#1e40af', borderColor: '#1e40af' }}>
            Enviar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    </div>

  );
};
export default Notas;