import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import '../matricula.css'
import "styled-components";
import { FcCancel, FcFinePrint } from "react-icons/fc";
import { format, parseISO, set } from "date-fns";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import styled from 'styled-components';

const MenuMatricula = () => {
const [NumCuenta, setNumCuenta] = useState("");
const [Nombre, setNombre] = useState("");
const [Apellido, setApellido] = useState("");
const [Carrera, setCarrera] = useState("");
const [historialData, setHistorialData] = useState([]);
const [historialDataListaEspera, setHistorialDataListaEspera] = useState([]);
const [sistema, setSistema] = useState([]);
const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
const [showModal, setShowModal] = useState(false);
const [classToDelete, setClassToDelete] = useState(null);
const fechaActual = new Date();
const [ContadorUVS, setContadorUVS] =  useState(24);
const [modalType, setModalType] = useState("");
const [centroRegional, setCentroRegional] = useState("");
const [carreras, setCarreras] = useState([]);
const [asignaturas, setAsignaturas] = useState([]);
const [secciones, setSecciones] = useState([]);
const year = fechaActual.getFullYear();
const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
const day = String(fechaActual.getDate()).padStart(2, "0");


const fechaActualString = `${year}-${month}-${day}`;


const añoActual = fechaActual.getFullYear();

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#145eb9',
            color: 'white',
            borderBottom: '1px solid #c6c6c6', 
        },
        },
        rows: {
        style: {
            border: '1px solid #c6c6c6', 
            textAlign: 'center',
        },
        },
    };
    
    const TableHeaderCell = styled.div`
    margin: auto;
    `;

const SubirContador = async (row) => {
    console.log(row);


    // Check if row is defined before accessing its properties
    if (row && row.UV) {

        const UV = ContadorUVS + row.UV;

        try {
            const URL = "http://localhost:5000/actualizarUVS";
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    NumCuenta: NumCuenta,
                    UVactualizadas: UV,
                }),
                });
                const data = await response.json();
                setContadorUVS(UV);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    }
};


const DecrementarContador = async (row) => {
    console.log(row);

    // Check if row is defined before accessing its properties
    if (row && row.UV) {
    const UV = ContadorUVS - row.UV;

    try {
        const URL = "http://localhost:5000/actualizarUVS";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                NumCuenta: NumCuenta,
                UVactualizadas: UV,
            }),
            });
            const data = await response.json();
            setContadorUVS(UV);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}
};


useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
        const userData = JSON.parse(storedData);
        const numCuenta = userData.data.NumCuenta;
        const nombre = userData.data.Nombre;
        const apellido = userData.data.apellido; 
        const carrera = userData.data.Carrera;
        const Sistema = userData.data.Sistema;
        console.log(Sistema);
        setNombre(nombre);
        setApellido(apellido);
        setNumCuenta(numCuenta);
        setCarrera(carrera);
        setSistema(Sistema);
        setCentroRegional(userData.data.CentroRegional);
    }
    obtenerUVS();

}, [NumCuenta]);

const obtenerUVS = async () => {
    try {
        const URL = "http://localhost:5000/ObtenerUVS";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                NumCuenta: NumCuenta,
            }),
            });
            const data = await response.json();
            setContadorUVS(data[0].UVDisponibles);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
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
        const URL = "http://localhost:5000/ClasesParaMatricula";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                carrera: Carrera,
            }),
            });
            const data = await response.json();
            const nombresClases = data.map((carrera) => carrera.NombreCarrera);

            setCarreras(nombresClases);
            console.log(nombresClases);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    
};

const columnas1 = [
    {
    name: <TableHeaderCell>CÓDIGO</TableHeaderCell>,
    selector: (row) => row.CODIGO,
    cell: row => <TableHeaderCell>{row.CODIGO}</TableHeaderCell>
    },
    {
    name: "ASIGNATURA", 
    selector: (row) => row.ASIGNATURA,
    width: "18%",
    },
    {
    name: "SECCIÓN",
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
    name: "DÍAS",
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
        name: "UV",
        selector: (row) => row.UV,
        },
    {
        name: "ELIMINAR",
        cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => eliminarClaseMatriculada(row)}>
            <FcCancel />
        </h1>
        ),
    },
];
const NoDataComponent = () => {
    return <div>No hay clases matriculadas para mostrar</div>;
};


const columnas2 = [
    {
    name: <TableHeaderCell>CÓDIGO</TableHeaderCell>,
    selector: (row) => row.CODIGO,
    cell: row => <TableHeaderCell>{row.CODIGO}</TableHeaderCell>
    },
    {
    name: "ASIGNATURA", 
    selector: (row) => row.ASIGNATURA,
    width: "18%",
    },
    {
    name: "SECCIÓN",
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
    name: "DÍAS",
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
        name: "UV",
        selector: (row) => row.UV,
        },
    {
        name: "ELIMINAR",
        cell: (row) => (
        <h1 className="cursor-pointer" onClick={() => eliminarClaseEnEspera(row)}>
            <FcCancel />
        </h1>
        ),
    },
];
const NoDataComponent2 = () => {
    return <div>No hay clases en espera para mostrar</div>;
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
    return <div>No hay departamentos para mostrar</div>;
};



const handleRowClickAsingatura = async (row) => {
    // Aquí puedes realizar la acción que desees con la fila clickeada, por ejemplo:
    console.log("Fila clickeada:", row);

    try {
        const URL = "http://localhost:5000/AsignaturaParaMatricula";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                NumCuenta: NumCuenta,
                Departamento: row,
                carrera: Carrera,

            }),
            });
            const data = await response.json();
            const nombresAsignaturas = data.map((asignatura) => asignatura.Nombre);
            setAsignaturas(nombresAsignaturas);
            setSecciones([]);
            console.log(nombresAsignaturas);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }

};


const handleRowClickSecciones = async (row) => {
    // Aquí puedes realizar la acción que desees con la fila clickeada, por ejemplo:
    console.log("asignatura:", row);

    try {
        const URL = "http://localhost:5000/MostrarSeccionesMatricula";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                asignatura: row,
                Periodo: periodoAcademicoActual,
                CentroRegional: centroRegional,
            }),
            });
            const data = await response.json();
            setSecciones(data);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }

};

// Función para verificar los cupos de una clase
const verificarCupos = async (claseId) => {
    try {
    const response = await fetch("http://localhost:5000/verificarCupos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        claseId,
    }),
    });
    const data = await response.json();
    console.log("La respuesta de la API para cupos es:", data);
    return data[0].Cupos;
} catch (error) {
    console.error("Error al obtener los cupos:", error);
    throw error;
}
};

// Función para verificar conflictos de horarios
const verificarConflictosHorarios = async (IdEstudiante, Dias, HI, HF, Periodo) => {
    try {
    const response = await fetch("http://localhost:5000/verificarConflicto", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        IdEstudiante,
        Dias,
        HI,
        HF,
        Periodo,
    }),
    });
    const data = await response.json();
    console.log("La respuesta de la API para conflictos de horarios es:", data);
    return data;
} catch (error) {
    console.error("Error al verificar conflictos de horarios:", error);
    throw error;
}
};


// Función para verificar conflictos de horarios
const verificarClaseSiEstaMatriculadaYa = async (IdEstudiante, IdClase) => {
    try {
    const response = await fetch("http://localhost:5000/verificarClaseMatriculaONo", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        IdEstudiante,
        IdClase,
    }),
    });
    const data = await response.json();
    console.log("La respuesta de la API para verificar si la clase esta matriculada es: ", data);
    return data.totalConflicts;
} catch (error) {
    console.error("Error al verificar conflictos de horarios:", error);
    throw error;
}
};

const handleRowClickObtenerClase = async (row) => {
    try {
        console.log("el row es:", row);
        console.log("la clase es:", row.IdSeccion);
        console.log("el IDclase es: ", row.IdClase[0]);


        const cuposDisponibles = await verificarCupos(row.IdSeccion);
        console.log("Cupos disponibles:", cuposDisponibles);

        // Verificar conflictos de horarios antes de matricular en la lista de espera
        const conflictosHorariosEspera = await verificarConflictosHorarios(
            NumCuenta,
            row.Dias,
            row.HI,
            row.HF,
            periodoAcademicoActual
        );

        // Verificar si la clase ya esta matriculada 
        const verificarClaseSiEstaMatriculada= await verificarClaseSiEstaMatriculadaYa(
            NumCuenta,
            row.IdClase[0]
        );
        
        if(row.UV <= ContadorUVS){

        if (verificarClaseSiEstaMatriculada == 0) {

        if (conflictosHorariosEspera > 0) {
            // Hay conflictos de horarios para la clase en espera
            alert("No puedes matricular la clase. Existen conflictos de horarios.");
        } else if (cuposDisponibles === 0) {
            // Los cupos están agotados
            const confirmacion = window.confirm("No puedes matricular la clase. Los cupos están agotados. ¿Deseas poner la clase en lista de espera?");
            if (confirmacion) {
                // Aquí puedes realizar la acción para poner la clase en lista de espera
                const Estado = "EN ESPERA";
                const response = await fetch("http://localhost:5000/MatricularClase", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ NumCuenta: NumCuenta, IdSeccion: row.IdSeccion, fecha: fechaActualString, estado: Estado }),
                });
                DecrementarContador(row);
                window.location.reload();
                alert("La clase ha sido añadida a la lista de espera.");
            }
        } else  {
            // Verificar conflictos de horarios antes de matricular
            const conflictosHorarios = await verificarConflictosHorarios(
                NumCuenta,
                row.Dias,
                row.HI,
                row.HF,
                periodoAcademicoActual
            );
            console.log("Conflictos de horarios:", conflictosHorarios)

            if (conflictosHorarios > 0) {
                // Hay conflictos de horarios para la matrícula
                alert("No puedes matricular la clase. Existen conflictos de horarios.");
            } else {
                const confirmacion = window.confirm("¿Deseas Matricular esta clase?");
                if (confirmacion) {
                    // Puedes matricular la clase
                    const Estado = "MATRICULADO";
                    const response = await fetch("http://localhost:5000/MatricularClase", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ NumCuenta: NumCuenta, IdSeccion: row.IdSeccion, fecha: fechaActualString, estado: Estado }),
                    });
                    DecrementarContador(row);
                    window.location.reload();
                    alert("Clase matriculada exitosamente.");
                    
                    
                }
            }
        }
    } else {
        alert("La clase ya esta matriculada o en lista de espera.");
    }
}
else {
    alert("Ya no puedes matricular más clases. Has alcanzado el límite de UVs.");
}
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};




const columnas4 = [
    {
    name: "ASIGNATURA",
    selector: (row) => row,
    style: {
        fontSize: "15px",
        cursor: "pointer",
    },
    },
];
const NoDataComponent4 = () => {
    return <div style={{backgroundColor:"#fe5e5e", color:"white"}}>No tiene clases en este departamento</div>;
};

const columnas5 = [
    {
    name: "SECCIONES",
    selector: (row) => (
        <div>
            <p>Sección: {row.Seccion}, Dias: {row.Dias}, Cupos: {row.Cupos}, Prof: {row.Nombre[0]} {row.Apellido}</p>
        </div>
    ),
    style: {
        fontSize: "15px",
        cursor: "pointer",
    },
    },
];
const NoDataComponent5 = () => {
    return <div style={{backgroundColor:"#fe5e5e", color:"white"}} >No hay secciones para mostrar</div>;
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

const confirmarEliminacion = (classToDelete) => {
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
            SubirContador(classToDelete);
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
                SubirContador(classToDelete);
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
    <div style={{ borderRadius: "5px",  padding: "5px", backgroundColor:"#145eb9"}}>
    <p className="pt-2 pb-1 text-center" style={{color:"white", fontSize:"20px"}}>DATOS DEL ESTUDIANTE</p>
    </div>
    <div className="col-md-6 border-1" style={{ borderRadius: "5px", padding: "10px",border: "1px solid #c6c6c6" }}>
    <p className="pt-2 pb-1 text-center">Nombre:  &nbsp;{Nombre} {Apellido}</p>
    <p className="pt-2 pb-1 text-center">Año: {añoActual} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Período: {periodoAcademicoActual}</p>
    </div>
    <div className="col-md-6 border-1" style={{ borderRadius: "5px", padding: "10px",border: "1px solid #c6c6c6" }}>
    <p className="pt-2 pb-1 text-center">Carrera: &nbsp; {Carrera}</p>
    
    <p className="pt-2 pb-1 text-center">UV Disponibles: &nbsp; {ContadorUVS}</p>
    </div>

    <br />

    <div className="d-flex align-items-center pt-10">

    <button type="button" onClick={handleOpenDependentListModal}>
        Adicionar Asignatura
    </button>

    </div>
    </div>

    <h1 className="text-2xl text-center font-bold pt-2 pb-3 text-gray-900 sm:text-3xl">
        Asignaturas matriculadas
        </h1>
        <br />
        <DataTable
        columns={columnas1}
        className="mi-tabla"
        data={historialData}
        noDataComponent={<NoDataComponent />}
        customStyles={customStyles}
        />

    <h1 className="text-2xl text-center font-bold pt-5 pb-5 text-gray-900 sm:text-3xl">
        Asignaturas en Lista de Espera
        </h1>

        <DataTable
        columns={columnas2}
        className="mi-tabla"
        data={historialDataListaEspera}
        noDataComponent={<NoDataComponent2 />}
        customStyles={customStyles}
        />
        <br />
    </div>
    <Modal isOpen={showModal} toggle={cancelarEliminacion}>
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
            <p className="m-0" style={{ marginLeft: "10px" }}>Confirmar cancelación</p>
            <Button onClick={cancelarEliminacion} >X</Button>
        </div>
        <ModalBody>
            {modalType === "matriculada"
            ? "¿Estás seguro de que deseas eliminar esta clase matriculada?"
            : modalType === "en espera"
            ? "¿Estás seguro de que deseas eliminar esta clase en espera?"
            : ""}
    </ModalBody>
    <ModalFooter>
        <button className="btn btn-secondary" onClick={() => confirmarEliminacion(classToDelete)}>
            Aceptar
        </button>

        <button className="btn btn-secondary" onClick={cancelarEliminacion}>
        Cancelar
        </button>
    </ModalFooter>
    </Modal>


    {/* Modal con la lista dependiente */}
    <Modal isOpen={showDependentListModal} toggle={handleCloseDependentListModal} style={{ maxWidth: "1600px", width: "100%", margin: "0 auto", paddingTop: "270px" }}>
    <div className="d-flex justify-content-between align-items-center border-bottom p-3">
        <p className="m-0" style={{ marginLeft: "10px" }}>Detalle de asignaturas</p>
        <Button onClick={handleCloseDependentListModal} >X</Button>
    </div>
    <ModalBody>
    <div className="container">
    <div className="row no-gutters">
        <div className="col-4 p-1" style={{ maxHeight: "400px", overflowY: "auto"}}>
        <DataTable
            columns={columnas3}
            className="mi-tabla"
            data={carreras}
            noDataComponent={<NoDataComponent3 />}
            onRowClicked={handleRowClickAsingatura} 
        />
        </div>
        <div className="col-4 p-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable
            columns={columnas4}
            className="mi-tabla"
            data={asignaturas}
            noDataComponent={<NoDataComponent4 />}
            onRowClicked={handleRowClickSecciones} 
        />
        </div>
        <div className="col-4 p-1" style={{ maxHeight: "450px", overflowY: "auto" }}>
        <DataTable
            columns={columnas5}
            className="mi-tabla"
            data={secciones}
            noDataComponent={<NoDataComponent5 />}
            onRowClicked={handleRowClickObtenerClase}
        />
        </div>
    </div>
    </div>

    </ModalBody>
    <ModalFooter>
    <div className="container ">
    <div className="row">
    <p className="pt-2 pb-1 text-center">
    SISTEMA DE MATRICULA - Dirección Ejecutiva de Ingenieria del Software (DEIS)</p>
    </div>
    </div>

    </ModalFooter>
    </Modal>


</div>
);

};

export default MenuMatricula;
