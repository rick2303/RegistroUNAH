import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { FcCancel, FcFinePrint } from "react-icons/fc";
import { format, parseISO, set } from "date-fns";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";



const MenuMatricula = () => {
const [NumCuenta, setNumCuenta] = useState("");
const [Nombre, setNombre] = useState("");
const [Apellido, setApellido] = useState("");
const [Carrera, setCarrera] = useState("");
const [historialData, setHistorialData] = useState([]);
const [historialDataListaEspera, setHistorialDataListaEspera] = useState([]);
const [InfoEstudiante, setInfoEstudiante] = useState([]);
const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
const [showModal, setShowModal] = useState(false);
const [classToDelete, setClassToDelete] = useState(null);
const fechaActual = new Date();
const [ContadorUVS, setContadorUVS] =  useState(24);
const [modalType, setModalType] = useState("");
const [carreras, setCarreras] = useState([]);


const añoActual = fechaActual.getFullYear();
  // Función para decrementar contador y guardar en localStorage
const decrementarContador = () => {
if (classToDelete) {
    // Resto del código para eliminar la clase...
    setContadorUVS(prevContadorUVS => prevContadorUVS - classToDelete.UV);

    // Guardar en localStorage
    localStorage.setItem("contadorUVS", ContadorUVS - classToDelete.UV);
}
};

// localStorage.setItem("contadorUVS", 24);

// UseEffect para leer el valor del contador almacenado en localStorage
useEffect(() => {
const contadorGuardado = localStorage.getItem("contadorUVS");
if (contadorGuardado) {
    setContadorUVS(parseInt(contadorGuardado));
}
}, []);

useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
        const userData = JSON.parse(storedData);
        const numCuenta = userData.data.NumCuenta;
        const nombre = userData.data.Nombre;
        const apellido = userData.data.apellido; 
        const carrera = userData.data.Carrera;
        setNombre(nombre);
        setApellido(apellido);
        setNumCuenta(numCuenta);
        setCarrera(carrera);
    }
}, [NumCuenta]);


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
    if (NumCuenta && periodoAcademicoActual && añoActual) {
        fechINFO(NumCuenta, periodoAcademicoActual, añoActual);
    }
    console.log(periodoAcademicoActual);
}, [NumCuenta, periodoAcademicoActual, añoActual]);

const fechINFO = async (cuenta, periodo, year)=> {
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
            const data = await response.json();
            setHistorialData(data);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    try {
        const URL = "http://localhost:5000/enviarClasesEnListaDeEspera";
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
            const data = await response.json();
            setHistorialDataListaEspera(data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    try {
        const URL = "http://localhost:5000/carreras";
        const response = await fetch(URL, {
            method: "GET",
            });
            const data = await response.json();
            setCarreras(data);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
};

const columnas1 = [
    {
    name: "CODIGO",
    selector: (row) => row.CODIGO,
    },
    {
    name: "ASIGNATURA", 
    selector: (row) => row.ASIGNATURA,
    width: "18%",
    },
    {
    name: "SECCION",
    selector: (row) => row.SECCION,
    },
    {
    name: "HI",
    selector: (row) => row.HORA_INICIO,
    },
    {
    name: "HF",
    selector: (row) => row.HORA_FINAL,
    },
    {
    name: "Dias",
    selector: (row) => row.Dias,
    width: "10%",
    },
    {
    name: "EDIFICIO",
    selector: (row) => row.EDIFICIO,
    },
    {
    name: "AULA",
    selector: (row) => row.AULA,
    },

    {
    name: "PERIODO",
    selector: (row) => row.PERIODO,
    },
    {
        name: "UV",
        selector: (row) => row.UV,
        },
    {
        name: "Eliminar",
        cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => eliminarClaseMatriculada(row)}>
            <FcCancel />
        </h1>
        ),
    },
];
const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
};


const columnas2 = [
    {
    name: "CODIGO",
    selector: (row) => row.CODIGO,
    },
    {
    name: "ASIGNATURA", 
    selector: (row) => row.ASIGNATURA,
    width: "18%",
    },
    {
    name: "SECCION",
    selector: (row) => row.SECCION,
    },
    {
    name: "HI",
    selector: (row) => row.HORA_INICIO,
    },
    {
    name: "HF",
    selector: (row) => row.HORA_FINAL,
    },
    {
    name: "Dias",
    selector: (row) => row.Dias,
    width: "10%",
    },
    {
    name: "EDIFICIO",
    selector: (row) => row.EDIFICIO,
    },
    {
    name: "AULA",
    selector: (row) => row.AULA,
    },

    {
    name: "PERIODO",
    selector: (row) => row.PERIODO,
    },
    {
        name: "UV",
        selector: (row) => row.UV,
        },
    {
        name: "Eliminar",
        cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => eliminarClaseEnEspera(row)}>
            <FcCancel />
        </h1>
        ),
    },
];
const NoDataComponent2 = () => {
    return <div>No hay registros para mostrar</div>;
};

const columnas3 = [
{
    name: "DEPARTAMENTO",
    selector: (row) => row,
    style: {
        fontSize: "15px",
        cursor: "pointer",
    },
},
];
const NoDataComponent3 = () => {
    return <div>No hay registros para mostrar</div>;
};


const handleRowClick = (row) => {
    // Aquí puedes realizar la acción que desees con la fila clickeada, por ejemplo:
    console.log("Fila clickeada:", row);
};

const columnas4 = [
    {
    name: "ASIGNATURA",
    selector: (row) => row.CODIGO,
    },
];
const NoDataComponent4 = () => {
    return <div>No hay registros para mostrar</div>;
};

const columnas5 = [
    {
    name: "SECCIONES",
    selector: (row) => row.CODIGO,
    },
];
const NoDataComponent5 = () => {
    return <div>No hay registros para mostrar</div>;
};



const eliminarClaseMatriculada = (row) => {
    // Guarda la clase que se va a eliminar en el estado
    setClassToDelete(row);
    // Abre el modal de confirmación
    
    // Establece el tipo de modal como "matriculada"
    setModalType("matriculada");
    setShowModal(true);
};


const eliminarClaseEnEspera = (row) => {
    // Guarda la clase que se va a eliminar en el estado
    setClassToDelete(row);
    setModalType("en espera");
    // Abre el modal de confirmación
    setShowModal(true);
};

const confirmarEliminacion = () => {
    // Cierra el modal de confirmación
    setShowModal(false);
    // Realiza la eliminación de la clase
    if (classToDelete) {
        if (modalType === "matriculada") {
        fetch("http://localhost:5000/eliminarClase", {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            numCuenta: NumCuenta,
            periodo: periodoAcademicoActual,
            idClase: classToDelete.CODIGO,
            año: añoActual,
            }),
        })
        .then((data) => {
            console.log("Clase eliminada exitosamente");
            alert("Clase eliminada exitosamente");
            decrementarContador();
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error en la eliminación de la clase:", error);
        });
        } else if (modalType === "en espera") {
            fetch("http://localhost:5000/eliminarClase", {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                numCuenta: NumCuenta,
                periodo: periodoAcademicoActual,
                idClase: classToDelete.CODIGO,
                año: añoActual,
                }),
            })
            .then((data) => {
                console.log("Clase eliminada exitosamente");
                alert("Clase eliminada exitosamente");
                decrementarContador();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error en la eliminación de la clase:", error);
            });
        }
        }
    };

const cancelarEliminacion = () => {
// Cierra el modal de confirmación
setShowModal(false);
};

// Agregar un estado para controlar si se muestra el modal con la lista dependiente
const [showDependentListModal, setShowDependentListModal] = useState(false);

// Función para manejar el clic en el botón "Adicionar Asignatura" y abrir el modal con la lista dependiente
const handleOpenDependentListModal = () => {
setShowDependentListModal(true);
};

// Función para cerrar el modal con la lista dependiente
const handleCloseDependentListModal = () => {
setShowDependentListModal(false);
};


return (
    <div className="App">
    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
    Matricula
    </h1>


    <div className="container ">
    <div className="row">
    <div className="border" style={{ borderRadius: "5px", padding: "5px", backgroundColor:"#145eb9"}}>
    <p className="pt-2 pb-1 text-center" style={{color:"white", fontSize:"20px"}}>Datos del estudiante</p>
    </div>
    <div className="col-md-6 border" style={{ borderRadius: "5px", padding: "10px" }}>
    <p className="pt-2 pb-1 text-center">Nombre:  &nbsp;{Nombre} {Apellido}</p>
    <p className="pt-2 pb-1 text-center">Año: {añoActual} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Periodo: {periodoAcademicoActual}</p>
    </div>
    <div className="col-md-6 border" style={{ borderRadius: "5px", padding: "10px" }}>
    <p className="pt-2 pb-1 text-center">Carrera: &nbsp; {Carrera}</p>
    
    <p className="pt-2 pb-1 text-center">UV Disponibles: &nbsp; {ContadorUVS}</p>
    </div>

    <br />

    <div className="d-flex align-items-center pt-10">

    <button type="button" onClick={handleOpenDependentListModal}>
        Adicionar Asignatura
    </button>

    </div>
    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Asignaturas matriculadas
        </h1>
        <br />
        <DataTable
        columns={columnas1}
        className="mi-tabla"
        data={historialData}
        noDataComponent={<NoDataComponent />}
        />
    
    <br />

    <h1 className="text-2xl text-center font-bold pt-5 pb-5 text-gray-900 sm:text-3xl">
        Asignaturas en Lista de Espera
        </h1>
        <br />
        <DataTable
        columns={columnas2}
        className="mi-tabla"
        data={historialDataListaEspera}
        noDataComponent={<NoDataComponent2 />}
        />
    </div>

    </div>
    <Modal isOpen={showModal} toggle={cancelarEliminacion}>
        <ModalHeader toggle={cancelarEliminacion}>Confirmar eliminación</ModalHeader>
        <ModalBody>
            {modalType === "matriculada"
            ? "¿Estás seguro de que deseas eliminar esta clase matriculada?"
            : modalType === "en espera"
            ? "¿Estás seguro de que deseas eliminar esta clase en espera?"
            : ""}
    </ModalBody>
    <ModalFooter>
        <button className="btn btn-danger" onClick={confirmarEliminacion}>
        Aceptar
        </button>
        <button className="btn btn-secondary" onClick={cancelarEliminacion}>
        Cancelar
        </button>
    </ModalFooter>
    </Modal>


    {/* Modal con la lista dependiente */}
    <Modal isOpen={showDependentListModal} toggle={handleCloseDependentListModal} style={{ maxWidth: "1450px", width: "100%", margin: "0 auto", paddingTop: "270px" }}>
    <ModalHeader toggle={handleCloseDependentListModal}>Detalle de asignaturas</ModalHeader>
    <ModalBody>
    <div className="container">
    <div className="row no-gutters">
        <div className="col-4 p-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable
            columns={columnas3}
            className="mi-tabla"
            data={carreras}
            noDataComponent={<NoDataComponent3 />}
            onRowClicked={handleRowClick} 
        />
        </div>
        <div className="col-4 p-1">
        <DataTable
            columns={columnas4}
            className="mi-tabla"
            data={historialData}
            noDataComponent={<NoDataComponent4 />}
        />
        </div>
        <div className="col-4 p-1">
        <DataTable
            columns={columnas5}
            className="mi-tabla"
            data={historialData}
            noDataComponent={<NoDataComponent5 />}
        />
        </div>
    </div>
    </div>



    </ModalBody>
    <ModalFooter>
        <Button variant="secondary" onClick={handleCloseDependentListModal}>
        Matricular asignatura
        </Button>
        {/* Si necesitas algún botón de acción en la lista dependiente, puedes agregarlo aquí */}
    </ModalFooter>
    </Modal>







</div>
);

};

export default MenuMatricula;