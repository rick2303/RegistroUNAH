import "bootstrap/dist/css/bootstrap.min.css";
import { set } from "date-fns";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import { FcDeleteRow } from "react-icons/fc";
import { Input } from "reactstrap";
import styled from "styled-components";

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};
const SeccionesMain = () => {
  const [Departamento, setDepartamento] = useState("");
  const [CentroRegional, setNumCentroRegional] = useState("");
  const [clases, setClases] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [edificio, setEdificio] = useState("");
  const [aulaSeleccionada, setAulaSeleccionada] = useState("");
  const [claseSeleccionada, setClaseSeleccionada] = useState("");
  const [uvSeleccionada, setUVSeleccionada] = useState("");
  const [docenteSeleccionado, setDocenteSeleccionado] = useState("");
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("");
  const [hiSeleccionado, setHiSeleccionado] = useState("");
  const [hfSeleccionado, setHfSeleccionado] = useState("");
  const [cupos, setCupos] = useState("");
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [observaciones, setObservaciones] = useState("");
  const [sections, setSections] = useState([]);
  const [esClaseServicio, setEsClaseServicio] = useState("");
  const [seccion, setSeccion] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [backendResponse, setBackendResponse] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const Depto = userData.data.Carrera;
      const centro = userData.data.CentroRegional;
      console.log(Depto, centro);
      setDepartamento(Depto);
      setNumCentroRegional(centro);
    }
  }, []);
  const obtenerClases = async () => {
    fetch("http://localhost:5000/TraerClases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Departamento: Departamento }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("estas son las clases", data);
        setClases(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
    fetch("http://localhost:5000/TraerDocentes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Carrera: Departamento,
        CentroRegional: CentroRegional,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("estos son los docentes", data);
        setDocentes(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };
  const fetchAulas = async (edificio) => {
    // Lógica para obtener la lista de aulas desde tu API, pasando el edificio como parámetro
    try {
      const response = await fetch(`http://localhost:5000/Aulas/${edificio}`);
      const data = await response.json();
      setAulas(data);
    } catch (error) {
      console.log("Error al obtener las aulas", error);
    }
  };
  const handleCheckboxChange = (event) => {
    const valorCheckbox = event.target.value;
    const isChecked = event.target.checked;
  
    if (isChecked) {
      // Agregar el valor a los días seleccionados
      setDiasSeleccionados((prevDiasSeleccionados) => {
        const updatedDays = [...prevDiasSeleccionados, valorCheckbox];
        return updatedDays.sort((a, b) => {
          const daysOrder = 'LuMaMiJuViSa';
          return daysOrder.indexOf(a) - daysOrder.indexOf(b);
        });
      });
  
      if (diasSeleccionados.length >= uvSeleccionada) {
        alert("No puede poner más días que las UV de la clase, por favor, deseleccione un día");
      }

      
    } else {
      // Remover el valor de los días seleccionados
      setDiasSeleccionados((prevDiasSeleccionados) =>
        prevDiasSeleccionados.filter((dia) => dia !== valorCheckbox)
      );
    }
    console.log(diasSeleccionados)
  };
  
  const diasConcatenados = diasSeleccionados.join("");
  const handleCuposClick = (row) => {
    const cantidad = prompt("Ingrese la cantidad de cupos a agregar:");
    //.trim para eliminar los espacios y isNaN para asegurarse que sea un numero
    if (cantidad !== null && !isNaN(cantidad) && cantidad.trim() !== "") {
      const parsedCantidad = parseInt(cantidad);

      if (parsedCantidad > 0) {
        fetch(`http://localhost:5000/agregarCupos/${row.IdSeccion}`, {
          method: "PUT",
          body: JSON.stringify({
            Cupos: parsedCantidad,
            // Otros datos necesarios para la solicitud
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.status === 200) {
              window.location.reload();
            }
          })
          .catch((error) => {
            // Manejar el error
          });
      } else {
        alert("La cantidad debe ser mayor que 0");
      }
    } else {
      alert("Por favor, ingrese una cantidad válida.");
    }
  };

  const handleEdificioChange = (event) => {
    setEdificio(event.target.value);
  };
  const handleInputChange = (event) => {
    setSeccion(event.target.value);
  };
  const handleObservacionesChange = (event) => {
    setObservaciones(event.target.value);
  };
  const handleAulaChange = (event) => {
    setAulaSeleccionada(event.target.value);
  };
  const handlePeriodoChange = (event) => {
    setPeriodoSeleccionado(event.target.value);
  };
  const handleHiChange = (event) => {
    setHiSeleccionado(event.target.value);
  };
  const handleEsClaseServicioChange = (event) => {
    setEsClaseServicio(event.target.value);
  };
  const handleHfChange = (event) => {
    setHfSeleccionado(event.target.value);
  };
  const handleClaseChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const uvValue = selectedOption.getAttribute("data-uv");
    const idValue = selectedOption.getAttribute("data-id");
    console.log("estas son las uvs", uvValue);
    console.log("estas son las id", idValue);
    setClaseSeleccionada(idValue);
    setUVSeleccionada(uvValue);
  };
  const handleDocenteChange = (event) => {
    setDocenteSeleccionado(event.target.value);
  };
  const handleCuposChange = (event) => {
    setCupos(event.target.value);
  };
  const showData = async () => {
    fetch("http://localhost:5000/secciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Departamento: Departamento,
        CentroRegional: CentroRegional,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        console.log("estas son las secciones", data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };
  const handleCrearSeccion = async () => {
    try {
      const storedData = localStorage.getItem("userData");
      if (!storedData) {
        alert("No se encontraron datos de usuario almacenados");
        return;
      }
      const userData = JSON.parse(storedData);
      const centroRegional = userData.data.CentroRegional;
      // Enviar el valor de la aula seleccionada al backend utilizando un fetch separado
      const response = await fetch("http://localhost:5000/crearSeccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdClase: claseSeleccionada,
          Edificio: edificio,
          Aula: aulaSeleccionada,
          HI: hiSeleccionado,
          Seccion: seccion,
          HF: hfSeleccionado,
          Periodo: periodoSeleccionado,
          Obs: observaciones,
          IdDocente: docenteSeleccionado,
          Dias: diasConcatenados,
          Cupos: parseInt(cupos, 10),
          CentroRegional: centroRegional,
          ClaseServicio: esClaseServicio,
        }),
      });
      const data = await response.json();
      // Actualizar el estado del mensaje de respuesta
      setBackendResponse(data);
      alert(data.message);
      if (response.status === 200) {
        window.location.reload();
        console.log(data);
      }
    } catch (error) {
      alert("Error al crear la seccion");
    }
  };
  const eliminarFila = (row) => {
    // Solicitar al usuario que ingrese una justificación
    const justificacion = prompt("Ingrese una justificación:");

    if (justificacion !== null) {
      const data = {
        justificado: justificacion,
        clase: row.Clase,
        uvs: row.UV,
      };
      fetch(`http://localhost:5000/seccionEliminar/${row.IdSeccion}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          // Analizar la respuesta como JSON
          return response.json();
        })
        .then((data) => {
          // Mostrar el mensaje de respuesta en un alert
          alert(data.message);
          if (data.status === 200) {
            window.location.reload();
            console.log(data);
          } else {
            throw new Error("Error en la solicitud");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la sección:", error);
        });
    }
  };

  useEffect(() => {
    obtenerClases();
  }, [Departamento]);
  useEffect(() => {
    showData();
  }, [Departamento, CentroRegional]);
  useEffect(() => {
    if (edificio) {
      // Lógica para obtener la lista de aulas
      fetchAulas(edificio);
    }
  }, [edificio]);
  //configuramos las columnas para DataTable

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#145eb9",
        color: "white",
        borderBottom: "1px solid #c6c6c6",
      },
    },
    rows: {
      style: {
        border: "1px solid #c6c6c6",
        textAlign: "center",
      },
    },
  };

  const TableHeaderCell = styled.div`
    margin: auto;
  `;

  const columnas = [
    {
      name: "ASIGNATURA",
      selector: (row) => row.Asignatura,
      width: "240px",
    },
    {
      name: "EDIFICIO",
      selector: (row) => row.Edificio,
      center: true,
    },
    {
      name: "AULA",
      selector: (row) => row.Aula,
      center: true,
    },
    {
      name: "DÍAS",
      selector: (row) => row.Dias,
      center: true,
    },
    {
      name: "HI",
      selector: (row) => row.HI,
      center: true,
    },
    {
      name: "HF",
      selector: (row) => row.HF,
      center: true,
    },
    {
      name: "CUPOS",
      selector: (row) => row.Cupos,
      center: true,
    },
    {
      name: "ESPERA",
      selector: (row) => row.cuentaListaDeEspera,
      center: true,
    },
    {
      name: "DOCENTE",
      selector: (row) => row.Nombre,
      width: "240px",
    },
    {
      name: "SECCIÓN",
      selector: (row) => row.Seccion,
      center: true,
    },
    {
      name: "PERÍODO",
      selector: (row) => row.Periodo,
      center: true,
    },
    {
      name: "ELIMINAR",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => eliminarFila(row)}>
          <FcDeleteRow />
        </h1>
      ),
      center: true,
    },
    {
      name: "EDITAR CUPOS",
      cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => handleCuposClick(row)}>
          <FaPlusCircle style={{ color: "#1e40af " }} />
        </h1>
      ),
      center: true,
    },
  ];
  const filteredData = sections.filter((row) =>
    row.Asignatura.includes(inputValue)
  );
  console.log("estas son las secciones filtradas", filteredData);
  //Mostramos la data en DataTable
  const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
  };
  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Crear nuevas secciones
      </h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4">
            <select
              className="form-select border-1"
              aria-label="Default select example"
              value={claseSeleccionada}
              onChange={handleClaseChange}
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
            >
              <option>Clase</option>
              {clases.map((clase) => (
                <option        
                key={clase.IdClase}
                value={clase.IdClase}
                data-uv={clase.UV}
                data-id={clase.IdClase}>
                  {clase.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-4">
            <select
              className="form-select border-1"
              aria-label="Default select example"
              value={edificio}
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              onChange={handleEdificioChange}
            >
              <option value="">Edificio</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
              <option value="C3">C3</option>
              <option value="Canchas VOAE">Canchas VOAE</option>
              <option value="D1">D1</option>
              <option value="E1">E1</option>
              <option value="F1">F1</option>
              <option value="G1">G1</option>
              <option value="H1">H1</option>
              <option value="J1">J1</option>
              <option value="K1">K1</option>
              <option value="K2">K2</option>
              <option value="L1">L1</option>
              <option value="Polideportivo">Polideportivo</option>
            </select>
          </div>
          <div className="col-md-6 mb-4">
            <select
              className="form-select border-1"
              aria-label="Default select example"
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              value={docenteSeleccionado}
              onChange={handleDocenteChange}
            >
              <option>Docente</option>
              {docentes.map((docente) => (
                <option key={docente.NumEmpleado} value={docente.NumEmpleado}>
                  {docente.Nombre} {docente.Apellido}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-4">
            <select
              className="form-select border-1"
              aria-label="Default select example"
              value={aulaSeleccionada}
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              onChange={handleAulaChange}
            >
              <option>Aula</option>
              {aulas.map((aula, index) => (
                <option key={index} value={aula}>
                  {aula}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-4">
            <select
              className="form-select border-1"
              aria-label="Default select example"
              value={hiSeleccionado}
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              onChange={handleHiChange}
            >
              <option selected>HI</option>
              <option value="600">600</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
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
            </select>
          </div>
          <div className="col-md-6 mb-4">
            <select
              className="form-select border-1"
              aria-label="Default select example"
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              value={hfSeleccionado}
              onChange={handleHfChange}
            >
              <option selected>HF</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
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
            </select>
          </div>
          <div className="col-md-6 mb-4">
            <select
              className="form-select border-1"
              aria-label="Default select example"
              value={periodoSeleccionado}
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              onChange={handlePeriodoChange}
            >
              <option>Periodo</option>
              <option value="1PAC">I PAC</option>
              <option value="2PAC">II PAC</option>
              <option value="3PAC">III PAC</option>
            </select>
          </div>

          <div className="col-md-6 mb-4">
            <input
              className="form-control"
              type="text"
              placeholder="Cantidad de cupos"
              value={cupos}
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              onChange={handleCuposChange}
              onKeyPress={(event) => {
                const charCode = event.which ? event.which : event.keyCode;
                if (charCode < 48 || charCode > 57) {
                  event.preventDefault();
                }
              }}
              aria-label="default input example"
            />
          </div>

          <div className="col-md-6 mb-4">
            <select
              className="form-select border-1"
              aria-label="Default select example"
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              onChange={handleEsClaseServicioChange}
            >
              <option value="">¿Es clase de servicio?</option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>
          </div>
          <div className="mb-4">
            <p className="pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
              Dias
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Lu"
                id="flexCheckDefault"
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Lunes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Ma"
                id="flexCheckChecked"
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Martes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Mi"
                id="flexCheckChecked"
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Miércoles
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Ju"
                id="flexCheckChecked"
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Jueves
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Vi"
                id="flexCheckChecked"
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Viernes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input "
                type="checkbox"
                value="Sa"
                id="flexCheckChecked"
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Sábado
              </label>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <input
              className="form-control border-1"
              type="text"
              placeholder="Observaciones"
              aria-label="default input example"
              style={{ border: "1px solid #c6c6c6 ", borderRadius: "5px" }}
              onChange={handleObservacionesChange}
            />
          </div>
          <div className="col-md-6 mb-4 align-self-left">
            <a
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#ModalCANCEL"
              onClick={handleCrearSeccion}
              style={{ backgroundColor: "#145eb9" }}
            >
              Crear sección
            </a>
          </div>

          <h1 className="text-2xl text-center font-bold pt-3 pb-4 text-gray-900 sm:text-3xl">
            Secciones creadas
          </h1>
          <div>
            <Input
              style={{
                textAlign: "center",
                marginTop: "5px",
                marginLeft: "80px",
                maxWidth: "300px",
                border: "2px solid #c6c6c6 ",
                borderRadius: "5px",
              }}
              id="inputCuenta"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ingresar Asignatura para filtrar"
            />
          </div>
          <br />
          <br />
        </div>
      </div>
      <div style={{ margin: "40px" }}>
        <DataTable
          noDataComponent={<NoDataComponent />}
          columns={columnas}
          customStyles={customStyles}
          data={sections} // Aquí usa todas las secciones sin filtrar
          paginationComponentOptions={paginationComponentOptions}
        ></DataTable>
      </div>
    </div>
  );
};
export default SeccionesMain;
