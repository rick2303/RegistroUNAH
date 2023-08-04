
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FcAbout } from "react-icons/fc";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import { format, parseISO } from "date-fns";
import "../App.css";

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const EvaluacionDocenteJefe = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [carrera, setCarrera] = useState("");
  const [centroRegional, setCentroRegional] = useState("");
  const [editedData, setEditedData] = useState({});
  const [promedioPorClase, setPromedioPorClase] = useState({});
  const [cantidadSiNoPorClase, setCantidadSiNoPorClase] = useState({});
  const [observacionesPorClase, setObservacionesPorClase] = useState({});
  

  const fetchDataGeneral = (carrera, centroRegional) => {
    fetch(`http://localhost:5000/docentesDepartamento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Carrera: carrera, CentroRegional: centroRegional }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHistorialData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const userData = JSON.parse(storedData);
    console.log(userData);
    const carrera = userData.data.Carrera;
    setCarrera(carrera);
    const centroRegional = userData.data.CentroRegional;
    setCentroRegional(centroRegional);

    // Guarda los valores de carrera y centroRegional en variables locales
    const carreraActual = carrera;
    const centroRegionalActual = centroRegional;

    // Llama a la función fetchData para obtener los datos usando las variables locales
    fetchDataGeneral(carreraActual, centroRegionalActual);
  }, []);

  useEffect(() => {
    // Fetch data whenever the inputValue changes
    if (inputValue.trim() === "") {
      // Si el inputValue está vacío, llamamos a fetchData con los valores actuales de carrera y centroRegional
      const storedData = localStorage.getItem("userData");
      const userData = JSON.parse(storedData);
      console.log(userData);
      const carrera = userData.data.Carrera;
      setCarrera(carrera);
      const centroRegional = userData.data.CentroRegional;
      setCentroRegional(centroRegional);

      // Guarda los valores de carrera y centroRegional en variables locales
      const carreraActual = carrera;
      const centroRegionalActual = centroRegional;

      // Llama a la función fetchData para obtener los datos usando las variables locales
      fetchDataGeneral(carreraActual, centroRegionalActual);
    } else {
      // Si el inputValue no está vacío, llamamos a fetchData con el inputValue
      fetchData();
    }
  }, [inputValue]);

  // Configuramos las columnas para DataTable
  const columnas1 = [
    {
      name: "N° DE EMPLEADO",
      selector: (row) => row.NumEmpleado,
    },
    {
      name: "DNI",
      selector: (row) => row.DNI,
    },
    {
      name: "NOMBRE",
      selector: (row) => row.Nombre + " " + row.Apellido,
      width: "300px",
    },
    {
      name: "EVALUACIÓN",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcAbout style={{ color: "#1e40af "}} />
        </h1>
      ),
    },
  ];

  const mostrarInformacion = (row) => {
    setSelectedRow(row);
    const data = [
      [
        {
          "idseccion": 21,
          "Asignatura": "Programación Aplicada",
          "Periodo": "2PAC",
          "IdDocente": 15198,
          "Nombre": "Enrique Jesus",
          "Apellido": "Ruiz Alvarez",
          "CorreoInstitucional": "juruizjesus@unah.edu.hn",
          "IdEstudiante": "20182001940",
          "Pregunta1": 1,
          "Pregunta2": 1,
          "Pregunta3": 1,
          "Pregunta4": "NO",
          "Pregunta5": "NO",
          "Observacion": "Es Barco"
        },
        {
          "idseccion": 22,
          "Asignatura": "Programación Aplicada",
          "Periodo": "2PAC",
          "IdDocente": 15198,
          "Nombre": "Enrique Jesus",
          "Apellido": "Ruiz Alvarez",
          "CorreoInstitucional": "juruizjesus@unah.edu.hn",
          "IdEstudiante": "20182001890",
          "Pregunta1": 2,
          "Pregunta2": 2,
          "Pregunta3": 2,
          "Pregunta4": "SI",
          "Pregunta5": "NO",
          "Observacion": "Excelente docente"
        }
      ],
      [
        {
          "idseccion": 23,
          "Asignatura": "Introducción a la Ingeniería",
          "Periodo": "2PAC",
          "IdDocente": 15198,
          "Nombre": "Enrique Jesus",
          "Apellido": "Ruiz Alvarez",
          "CorreoInstitucional": "juruizjesus@unah.edu.hn",
          "IdEstudiante": "20182002135",
          "Pregunta1": 3,
          "Pregunta2": 3,
          "Pregunta3": 3,
          "Pregunta4": "SI",
          "Pregunta5": "SI",
          "Observacion": "Muy paciente con los estudiantes"
        },
        {
          "idseccion": 24,
          "Asignatura": "Introducción a la Ingeniería",
          "Periodo": "2PAC",
          "IdDocente": 15198,
          "Nombre": "Enrique Jesus",
          "Apellido": "Ruiz Alvarez",
          "CorreoInstitucional": "juruizjesus@unah.edu.hn",
          "IdEstudiante": "20182001780",
          "Pregunta1": 4,
          "Pregunta2": 4,
          "Pregunta3": 4,
          "Pregunta4": "NO",
          "Pregunta5": "SI",
          "Observacion": "Hace que las clases de inglés sean divertidas"
        }
      ],
      [
        {
          "idseccion": 25,
          "Asignatura": "Inteligencia Artificial",
          "Periodo": "2PAC",
          "IdDocente": 15198,
          "Nombre": "Enrique Jesus",
          "Apellido": "Ruiz Alvarez",
          "CorreoInstitucional": "juruizjesus@unah.edu.hn",
          "IdEstudiante": "20182002257",
          "Pregunta1": 4,
          "Pregunta2": 5,
          "Pregunta3": 5,
          "Pregunta4": "SI",
          "Pregunta5": "SI",
          "Observacion": "Explica muy bien los conceptos de física"
        },
        {
          "idseccion": 26,
          "Asignatura": "Inteligencia Artificial",
          "Periodo": "2PAC",
          "IdDocente": 15198,
          "Nombre": "Enrique Jesus",
          "Apellido": "Ruiz Alvarez",
          "CorreoInstitucional": "juruizjesus@unah.edu.hn",
          "IdEstudiante": "20182002399",
          "Pregunta1": 2,
          "Pregunta2": 2,
          "Pregunta3": 3,
          "Pregunta4": "NO",
          "Pregunta5": "SI",
          "Observacion": "Tiene mucho conocimiento "
        },
        {
          "idseccion": 26,
          "Asignatura": "Inteligencia Artificial",
          "Periodo": "2PAC",
          "IdDocente": 15198,
          "Nombre": "Enrique Jesus",
          "Apellido": "Ruiz Alvarez",
          "CorreoInstitucional": "juruizjesus@unah.edu.hn",
          "IdEstudiante": "20182002399",
          "Pregunta1": 2,
          "Pregunta2": 2,
          "Pregunta3": 3,
          "Pregunta4": "NO",
          "Pregunta5": "SI",
          "Observacion": "Tiene mucho conocimiento "
        }
      ]
      
    ];

    //Organizar los datos en un objeto con clave "Asignatura" que contiene los registros de cada clase
    const dataPorClase = data.reduce((result, arregloClases) => {
      arregloClases.forEach((evaluacion) => {
        const asignatura = evaluacion.Asignatura;
        if (!result[asignatura]) {
          result[asignatura] = [];
        }
        result[asignatura].push(evaluacion);
      });
      return result;
    }, {});

    // Calcular el promedio de cada pregunta por clase
    const promedioPorClase = Object.keys(dataPorClase).reduce((result, asignatura) => {
      const evaluaciones = dataPorClase[asignatura];
      const numEvaluaciones = evaluaciones.length;
      const sumaPregunta1 = evaluaciones.reduce((sum, evaluacion) => sum + evaluacion.Pregunta1, 0);
      const sumaPregunta2 = evaluaciones.reduce((sum, evaluacion) => sum + evaluacion.Pregunta2, 0);
      const sumaPregunta3 = evaluaciones.reduce((sum, evaluacion) => sum + evaluacion.Pregunta3, 0);

      result[asignatura] = {
        promedioPregunta1: sumaPregunta1 / numEvaluaciones,
        promedioPregunta2: sumaPregunta2 / numEvaluaciones,
        promedioPregunta3: sumaPregunta3 / numEvaluaciones,
      };

      return result;
    }, {});

    // Calcular la cantidad de "SI" y "NO" por pregunta para cada clase
    const cantidadSiNoPorClase = calcularCantidadSiNoPorClase(data);
    setCantidadSiNoPorClase(cantidadSiNoPorClase);

    // Actualizar el estado con los promedios calculados
    setPromedioPorClase(promedioPorClase);
       // Guardar las observaciones por clase en el estado local
       const observacionesPorClase = data.reduce((result, arregloClases) => {
        arregloClases.forEach((evaluacion) => {
          const asignatura = evaluacion.Asignatura;
          if (!result[asignatura]) {
            result[asignatura] = [];
          }
          result[asignatura].push(evaluacion.Observacion);
        });
        return result;
      }, {});
  
      setObservacionesPorClase(observacionesPorClase);
  
      //Organizar los datos en un objeto con clave "Asignatura" que contiene los registros de cada clase
     /*  const dataPorClase = data.reduce((result, arregloClases) => {
        arregloClases.forEach((evaluacion) => {
          const asignatura = evaluacion.Asignatura;
          if (!result[asignatura]) {
            result[asignatura] = [];
          }
          result[asignatura].push(evaluacion);
        });
        return result;
      }, {}); */
    toggleModal();
  };

  const calcularCantidadSiNoPorClase = (data) => {
    const cantidadSiNoPorClase = {};
  
    data.forEach((evaluacionClase) => {
      const asignatura = evaluacionClase[0].Asignatura;
      const cantidadesPorPregunta = {
        Pregunta4: { SI: 0, NO: 0 },
        Pregunta5: { SI: 0, NO: 0 }, 
      };
  
      evaluacionClase.forEach((evaluacion) => {
        cantidadesPorPregunta.Pregunta4[evaluacion.Pregunta4 === "SI" ? "SI" : "NO"]++;
        cantidadesPorPregunta.Pregunta5[evaluacion.Pregunta5 === "SI" ? "SI" : "NO"]++;
      });
  
      cantidadSiNoPorClase[asignatura] = cantidadesPorPregunta;
    });
  
    return cantidadSiNoPorClase;
  };
  
  // Function to fetch data based on the input value
  const fetchData = () => {
    console.log(JSON.stringify({ DNI: inputValue }))
    fetch("http://localhost:5000/docentesDNI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ DNI: inputValue }), // Send input value as JSON
    })
    .then((response) => response.json())
    .then((data) => {
      // Si el JSON no es un array, conviértelo en un array con un solo elemento
      const dataArray = Array.isArray(data) ? data : [data];
      console.log("Array recibido del backend:", dataArray); // Imprime el array recibido en la consola
      setHistorialData(dataArray);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
  };

  // Para poner las filas no encontradas en español
  const filteredData = historialData.filter((row) => row.DNI.includes(inputValue));
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Evaluación Docente
      </h1>
      <div>
        <Input
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginLeft: "80px",
            maxWidth: "300px",
          }}
          id="inputCuenta"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ingresar DNI para filtrar"
        />
      </div>
      <br />

      <div className="container">
        <DataTable
          columns={columnas1}
          className="mi-tabla"
          data={filteredData}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          noHeader
          // Para poner las filas no encontradas en español
          noDataComponent={<NoDataComponent />}
          conditionalRowStyles={[
            {
              when: (row) => row.isSelected,
              style: {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            },
          ]}
        />
      </div>

      {selectedRow && (
        <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-xl">
          <ModalHeader className="text-white bg-blue-800 text-2xl">
            <strong>Evaluación Docente</strong>
            <button className="close boton_cierre" onClick={toggleModal}>
              <span aria-hidden="true">X</span>
            </button>
          </ModalHeader>
          <ModalBody>
           <label className="col-12 d-flex align-items-center justify-content-center"><strong>{ selectedRow.Nombre+ " "+ selectedRow.Apellido}</strong></label>
            
           <div>
              {Object.keys(promedioPorClase).map((asignatura, index) => (
                <div key={asignatura}>
                 <div className="d-flex align-items-center justify-content-center text-lg my-3">
                
                     <strong>{asignatura}</strong>
                  </div>

                  <div className="row">
      <div className="col-12 col-lg-6">
      <Table striped bordered hover responsive className="table-sm" >
          <thead>
            <tr>
              <th  className="d-flex align-items-center justify-content-center">Pregunta</th>
              <th  className="text-center">Promedio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td >Pregunta 1</td>
              <td className="text-center">{Math.round(promedioPorClase[asignatura].promedioPregunta1)}/5</td>
            </tr>
            <tr>
              <td>Pregunta 2</td>
              <td className="text-center">{Math.round(promedioPorClase[asignatura].promedioPregunta2)}/5</td>
            </tr>
            <tr>
              <td>Pregunta 3</td>
              <td className="text-center">{Math.round(promedioPorClase[asignatura].promedioPregunta3)}/5</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="col-12 col-lg-6">
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th  className="text-center">Pregunta</th>
              <th className="text-center"> "SI"</th>
              <th className="text-center"> "NO"</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Proporiona retroalimentación sobre las evaluaciones realizadas:</td>
              <td className="text-center">{cantidadSiNoPorClase[asignatura]?.Pregunta4?.SI}</td>
              <td className="text-center">{cantidadSiNoPorClase[asignatura]?.Pregunta4?.NO}</td>
            </tr>
            <tr>
              <td>Pregunta 5</td>
              <td className="text-center">{cantidadSiNoPorClase[asignatura]?.Pregunta5?.SI}</td>
              <td className="text-center">{cantidadSiNoPorClase[asignatura]?.Pregunta5?.NO}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
                  {/* Carrusel */}
                  <div
                    id={`carouselExampleControls-${index}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {observacionesPorClase[asignatura].map((observacion, observacionIndex) => (
                        <div
                        key={observacionIndex}
                        className={`carousel-item ${observacionIndex === 0 ? 'active' : ''}  text-center`}
                      >
                        {observacion}
                      </div>
                      
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carouselExampleControls-${index}`}
                      data-bs-slide="prev"
                      onClick={() => handleCarouselSlide((carouselIndex + observacionesPorClase[asignatura].length - 1) % observacionesPorClase[asignatura].length)}
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselExampleControls-${index}`}
                      data-bs-slide="next"
                      onClick={() => handleCarouselSlide((carouselIndex + 1) % observacionesPorClase[asignatura].length)}
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  {/* Fin Carrusel */}
                </div>
              ))}
            </div>
          
  
</ModalBody>

        </Modal>
      )}
    </div>
  );
};

export default EvaluacionDocenteJefe;
