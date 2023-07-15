import "bootstrap/dist/css/bootstrap.min.css"
import { set } from "date-fns";
import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components'



const SeccionesMain = () => {
    const [Departamento, setDepartamento] = useState("");
    const [CentroRegional, setNumCentroRegional] = useState("");
    const [clases, setClases] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [edificio, setEdificio] = useState("");
    const [aulaSeleccionada, setAulaSeleccionada] = useState("");
    const [claseSeleccionada, setClaseSeleccionada] = useState("");
    const [docenteSeleccionado, setDocenteSeleccionado] = useState("");
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState("");
    const [hiSeleccionado, setHiSeleccionado] = useState("");
    const [hfSeleccionado, setHfSeleccionado] = useState("");
    const [cupos, setCupos] = useState("");
    const [diasSeleccionados, setDiasSeleccionados] = useState([]);
    const [observaciones, setObservaciones] = useState("");
    const [sections,setSections] = useState([])
    const [esClaseServicio, setEsClaseServicio] = useState("");
    const [seccion, setSeccion] = useState("");


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
            console.log("estas son las clases",data);
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
        body: JSON.stringify({ Carrera: Departamento, CentroRegional: CentroRegional }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("estos son los docentes",data);
            setDocentes(data);
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });

}

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
      setDiasSeleccionados((prevDiasSeleccionados) => [...prevDiasSeleccionados, valorCheckbox]);
    } else {
      // Remover el valor de los días seleccionados
      setDiasSeleccionados((prevDiasSeleccionados) =>
        prevDiasSeleccionados.filter((dia) => dia !== valorCheckbox)
      );
    }
  };

  const diasConcatenados = diasSeleccionados.join("");

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
    setClaseSeleccionada(event.target.value);
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
        body: JSON.stringify({ Departamento: Departamento,CentroRegional: CentroRegional }),
        })
        .then((res) => res.json())
        .then((data) => {
            setSections(data);
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });

} 
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
      const response=await fetch("http://localhost:5000/crearSeccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            IdClase: claseSeleccionada,
            Edificio:edificio,
            Aula:aulaSeleccionada,
            HI:hiSeleccionado,
            Seccion:seccion,
            HF:hfSeleccionado,
            Periodo:periodoSeleccionado,
            Obs:observaciones,
            IdDocente:docenteSeleccionado,
            Dias:diasConcatenados,
            Cupos:parseInt(cupos, 10),
            CentroRegional:centroRegional,
            ClaseServicio:esClaseServicio
        }),
      });

      const data = await response.json();

      // Actualizar el estado del mensaje de respuesta
      setBackendResponse(data);

      alert(data.message);
     
    } catch (error) {
        alert("Error al crear sección");
    }
  };

 

useEffect(() => {
    obtenerClases()
  }, [Departamento])

  useEffect(() => {
    showData()
  }, [Departamento, CentroRegional])

  useEffect(() => {
    if (edificio) {
      // Lógica para obtener la lista de aulas
      fetchAulas(edificio);
    }
  }, [edificio]);

//configuramos las columnas para DataTable

const columnas = [
    {
    name:'CODIGO',
    selector : row => row.IdClase
    },
    {
    name:'EDIFICIO',
    selector : row => row.Edificio
    },
    {
    name:'AULA',
    selector : row => row.Aula
    },
    {
    name:'MATRICULADOS',
    selector : row => row.CantidadAlumnos
    },
    {
    name:'DIAS',
    selector : row => row.Dias
    },
    {
    name:'HI',
    selector : row => row.HI
    },
    {
    name:'HF',
    selector : row => row.HF
    },
    {
    name:'CUPOS',
    selector : row => row.Cupos
    },
    {
    name:'DOCENTE',
    selector : row => row.Nombre
    },
    {
    name:'SECCION',
    selector :row => row.Seccion
    },
    {
    name:'PERIODO',
    selector :row => row.Periodo
    },
    ]

//Mostramos la data en DataTable

    return (
        

        <div className="App">
        <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
            Crear nuevas secciones
        </h1>

        <div className="container">
        <div className="row">
        <div className="col-md-6 mb-4">
        <select
            className="form-select border-3"
            aria-label="Default select example"
            value={claseSeleccionada}
            onChange={handleClaseChange}
          >
            <option>Clase</option>
            {clases.map((clase) => (
              <option key={clase.IdClase} value={clase.IdClase}>
                {clase.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-4">
      <select
        className="form-select border-3"
        aria-label="Default select example"
        value={edificio}
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
            className="form-select border-3"
            aria-label="Default select example"
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
          className="form-select border-3"
          aria-label="Default select example"
          value={aulaSeleccionada}
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
            className="form-select border-3"
            aria-label="Default select example"
            value={periodoSeleccionado}
            onChange={handlePeriodoChange}
          >
            <option>Periodo</option>
            <option value="1PAC">I PAC</option>
            <option value="2PAC">II PAC</option>
            <option value="3PAC">III PAC</option>
          </select>
        </div>

        <div className="col-md-6 mb-4">
            <select 
            className="form-select border-3"
            aria-label="Default select example"
            value={hiSeleccionado}
            onChange={handleHiChange}>
            <option selected>HI</option>
            <option value="7000">6000</option>
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
            </select>
        </div>

        <div className="col-md-6 mb-4">
            <select 
            className="form-select border-3"
            aria-label="Default select example"
            value={hfSeleccionado}
            onChange={handleHfChange}
            >
            <option selected>HF</option>
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
            <option value="2100">2100</option>
            </select>
        </div>
        

        <div className="col-md-6 mb-4">
        <input
className="form-control"
            type="text"
            placeholder="Cantidad de cupos"
            value={cupos}
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
            <select className="form-select border-3" aria-label="Default select example" onChange={handleEsClaseServicioChange}>
            <option value="">¿Es clase de servicio?</option>
            <option value="SI">SI</option>
            <option value="NO">NO</option>
            </select>
        </div>

        <div className="col-md-6 mb-4">
            <input className="form-control border-3" type="text" placeholder="Observaciones" aria-label="default input example" onChange={handleObservacionesChange}/>
        </div>


        <div className="col-md-6 mb-4">
            <p className="pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
            Dias
            </p>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Lu" id="flexCheckDefault"  onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Lunes
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Ma" id="flexCheckChecked" onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="flexCheckChecked">
                Martes
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Mi" id="flexCheckChecked"  onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor="flexCheckChecked">
                Miércoles
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Ju" id="flexCheckChecked" onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="flexCheckChecked">
                Jueves
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Vi" id="flexCheckChecked"  onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor="flexCheckChecked">
                Viernes
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input " type="checkbox" value="Sa" id="flexCheckChecked"  onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor="flexCheckChecked">
                Sábado
            </label>
            </div>
        </div>
        <div className="col-md-6 mb-4">
            <input className="form-control border-3" type="text" placeholder="Seccion" aria-label="default input example" onChange={handleInputChange}/>
        </div>

        <div className="col-md-6 mb-4 align-self-left">
        <a className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalCANCEL" onClick={handleCrearSeccion}>
          Crear sección
        </a>
      </div>



        <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
            Secciones creadas
        </h1>

        <DataTable
        columns={columnas}
        data={sections}
        pagination
        ></DataTable>
    </div>
</div>

    </div>

    )


}


export default SeccionesMain;