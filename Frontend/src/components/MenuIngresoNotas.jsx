import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FcShare } from "react-icons/fc";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import "../App.css";

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const MenuIngresoNotas = () => {
  const [inputValue, setInputValue] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [carrera, setCarrera] = useState("");
  const [centroRegional, setCentroRegional] = useState("");

  

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
      name: "SECCIONES ASIGNADAS",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
          <FcShare style={{ color: "#1e40af "}} />
        </h1>
      ),
    },
  ];
  
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

  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Notas Ingresadas
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

{/* 
      {selectedRow && (
        <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-lg">
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
                      Anterior
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Anterior</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselExampleControls-${index}`}
                      data-bs-slide="next"
                      onClick={() => handleCarouselSlide((carouselIndex + 1) % observacionesPorClase[asignatura].length)}
                    >
                      Siguiente
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Siguiente</span>
                    </button>
                  </div>
               
                </div>
              ))}
            </div>
          
  
</ModalBody>
        </Modal>
                      )}
                      */}
    </div>
  );
};

export default MenuIngresoNotas;
