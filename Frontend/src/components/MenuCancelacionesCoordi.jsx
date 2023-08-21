import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { format, parseISO, set } from "date-fns";
import "styled-components";
import styled from 'styled-components';

const MenuCancelaciones = () => {
const [NumCuenta, setNumCuenta] = useState("");
const [historialData, setHistorialData] = useState([]);
const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
const [users, setUsers] = useState([]);
const fechaActual = new Date();
const año = fechaActual.getFullYear();
const [carrera, setCarreraUsuario] = useState("");
const [centroRegional, setCentroRegional] = useState("");
const [idClase, setIdClase] = useState("");



useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
        const userData = JSON.parse(storedData);
        const Carrera = userData.data.Carrera;
        const CentroRegional = userData.data.CentroRegional;
        setCarreraUsuario(Carrera);
        setCentroRegional(CentroRegional);
    }
    showData();
}, [carrera, centroRegional]);

useEffect(() => {
    if (NumCuenta && periodoAcademicoActual && año) {
    showData(NumCuenta, periodoAcademicoActual, año);
    }
    console.log(periodoAcademicoActual);
}, [NumCuenta, periodoAcademicoActual, año]);

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

const handleDownloadPDF = ({ NumCuentaEnviada }) => {
fetch("http://localhost:5000/download-pdf", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({ NumCuenta: NumCuentaEnviada }),
    
})
    .then((res) => res.json())
    .then((data) => {
        console.log(NumCuentaEnviada);
        console.log(data);
    if (data && data.length > 0 && data[0].Documento) {
        const documento = data[0].Documento;
        console.log(documento);
        const url = `http://localhost:5000/download-PDF?documento=${encodeURIComponent(documento)}`;
        const link = document.createElement("a");
        link.href = url;
        link.download = `SolicitudCancelacion${NumCuenta}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
    } else {
        console.error("Error al descargar el PDF: Los datos recibidos son incorrectos o no contienen la propiedad 'Documento'.");
    }
    })
    .catch((error) => {
    console.error("Error al descargar el PDF:", error);
    });
};


// useEffect(() => {
//     showData();
// console.log(periodoAcademicoActual);
// }, [periodoAcademicoActual, año]);
const showData = async () => {
    //OBTENER LOS PERIFLES DE LOS ESTUDIANTES
try {
    const URL = "http://localhost:5000/enviarSolicitudesRealizadasCoordinador";
    const response = await fetch(URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ carrera: carrera, centroRegional: centroRegional}),
        
    })
        .then((res) => res.json())
        .then((data) => {
            setUsers(data);
            console.log(data);
    });
} catch (error) {
    console.error("Error al obtener los datos:", error);
}

};

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

// Configuramos las columnas para DataTable
const columnas1 = [
{
    name: "CÓDIGO",
    selector: (row) => row.IdClase,
},
{
    name: "ASIGNATURA",
    selector: (row) => row.Asignatura,
},
{
    name: "UV",
    selector: (row) => row.UV,
},
{
    name: "SECCIÓN",
    selector: (row) => row.Seccion,
},
{
    name: "PERÍODO",
    selector: (row) => row.Periodo,
},
{
    name: "ESTADO",
    selector: (row) => row.Estado,
},

];

const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

const handleSelectedRowsChange = (selectedRows) => {
    if (selectedRows.selectedCount > 0) {
        const filas = selectedRows.selectedRows;
        console.log(filas);
        setFilasSeleccionadas(filas);
    } else {
        setFilasSeleccionadas([]);
    }
};



const TablaCancelaciones = ({ data, columnas}) => {
    // console.log("Las filas seleccionadas son: ", filasSeleccionadas);

    const handleSubmit = (event) => {
        event.preventDefault(); // Evitar la recarga de la página al enviar el formulario
    };

    return (
        <div className="table-container" style={{ maxWidth: "1100px", margin: "auto", position: "relative", zIndex: 1 }}>
        <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
        Clases que solicita cancelar el estudiante:
        </p>
        <form onSubmit={handleSubmit}>
        <DataTable
        columns={columnas}
        data={data}
        />
        </form>
    </div>
    );
};

function CarruselUsuarios({ users }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentNumCuenta, setCurrentNumCuenta] = useState("");
    const [historialData, setHistorialData] = useState([]);

    const enviarCancelacionesCoordiACEPTADA = async (cuentaSend) => {
        console.log("El historial es: ", historialData);
    
        const NumCuenta = cuentaSend.toString();
        console.log("El numero de cuenta es: ", NumCuenta);
        const Estado = "Aprobada";
    
        for (const item of historialData) {
            const IdClase = item.IdClase;
            console.log("el id de la clase es: ", IdClase);
    
            try {
                const responsePut = await fetch("http://localhost:5000/dictamenSolicitudEnviar", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ numCuenta: NumCuenta, estado: Estado, idClase: IdClase }),
                });
    
                const dataPut = await responsePut.json();
    
                if (dataPut.message === "Error al procesar la solicitud") {
                    console.error("Error al enviar las cancelaciones:", dataPut.message);
                } else {
                    console.log(dataPut);
                    alert("Respuesta enviada al estudiante de la clase: " + IdClase + " con éxito");
                    window.location.reload();
                }
    
                const responseDelete = await fetch("http://localhost:5000/eliminarClase", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        numCuenta: NumCuenta,
                        periodo: periodoAcademicoActual,
                        idClase: IdClase,
                        año: año,
                    }),
                });
    
                const dataDelete = await responseDelete.json();
    
                console.log(dataDelete);
                console.log("Clase eliminada con éxito");
            } catch (error) {
                console.error("Error al enviar las cancelaciones:", error);
            }
        }
    };
    
    
    

    const enviarCancelacionesCoordiRECHAZADA = async (cuentaSend) => {

        console.log("El historial es: ", historialData); 

        const promises = historialData.map((item) => {
        const NumCuenta = cuentaSend.toString();
        console.log("El numero de cuenta es: ", NumCuenta);
        const Estado = "Rechazada";
        const IdClase = item.IdClase;
        console.log("el id de la clase es: ", IdClase);

        return fetch("http://localhost:5000/dictamenSolicitudEnviar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ numCuenta: NumCuenta, estado: Estado, idClase: IdClase }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Error al procesar la solicitud") {
            console.error("Error al enviar las cancelaciones:", data.message);
            } else {
            console.log(data);
            alert("Respuesta enviada al estudiante de la clase: " + IdClase + " con éxito");
            window.location.reload();
            }
        })
        .catch((error) => {
            console.error("Error al enviar las cancelaciones:", error);
        });
    });

    try {
        const responses = await Promise.all(promises);
        console.log(responses);
    } catch (error) {
        console.error("Error al enviar las cancelaciones:", error);
    }
    };


useEffect(() => {
    if (users.length > 0) {
    setCurrentNumCuenta(users[activeIndex].NumCuenta);
    }
}, [users, activeIndex]);

useEffect(() => {
    if (currentNumCuenta) {
    handleInputChangeNum(currentNumCuenta);
    }
}, [currentNumCuenta, users, activeIndex]); // Agrega users y activeIndex como dependencias

const handleInputChangeNum = (numeroCuenta) => {
    fetch("http://localhost:5000/enviarClasesdeSolicitudes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ NumCuenta: numeroCuenta }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setHistorialData(data);
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
    });
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % users.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
    };


return (

    <div id="carrusel" className="carousel">
    {users.map((user, index) => (
        <div
        key={index}
        className={index === activeIndex ? "carousel-item active" : "carousel-item"}
        >
        <img
            src={"../img/uploads/" + user.Imagen1}
            alt="No tiene imagen de perfil"
            style={{
            width: "100px",
            height: "100px",
            borderRadius: "20%",
            objectFit: "cover",
            margin: "auto",
            }}
        />
        <ul>
            <li>
            <p className="text-xl font-normal p-3 sm:text-1xl text-center">
                {user.Nombre} {user.Apellido}
            </p>
            </li>
            <li>
            <p className="pb-2 text-center">
                {user.CorreoInstitucional}
            </p>
            </li>
            <li>
            <p className="pb-1 text-center">
                Indice Global: {user.IndiceGlobal}
            </p>
            </li>
        </ul>


        <br></br>
        <div className="table-container" style={{ maxWidth: "1100px", margin: "auto" , position: "relative", zIndex: 1 }}>
            <TablaCancelaciones
            data={historialData}
            customStyles={customStyles}
            columnas={columnas1}
            onSelectedRowsChange={handleSelectedRowsChange}
            filasSeleccionadas={filasSeleccionadas}

        />
        </div>

        <br></br>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div className="card mx-auto">
            <div className="card-body p-1">
                <h2 className="card-title">Razones por la que el estudiante solicita la cancelación:</h2>
                <p className="card-text">{user.Descripcion}</p>
            </div>
            </div>
        </div>

        <br></br>
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a 
                onClick={() => handleDownloadPDF({ NumCuentaEnviada: user.NumCuenta})}
                style={{
                marginRight: "10px",
                backgroundColor: "#ffba42",
                borderRadius: "10%",
                fontSize: "1em",
                padding: "8px 16px",
                color: "white",
                cursor: "pointer",
                border: "1px solid white",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
                }}
            >
                Descargar pdf 
            </a>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <a 
                onClick={() => enviarCancelacionesCoordiRECHAZADA(user.NumCuenta)}
                style={{ 
                backgroundColor: "#eb5656",
                borderRadius: "10%",
                fontSize: "1em",
                padding: "8px 16px",
                color: "white",
                cursor: "pointer",
                border: "1px solid white",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
                }}>Negar solicitud</a>

            <a 
                onClick={() => enviarCancelacionesCoordiACEPTADA(user.NumCuenta)}
                type="button"
                style={{ 
                    marginLeft: "10px",
                    backgroundColor: "#69c825",
                    borderRadius: "10%",
                    fontSize: "1em",
                    padding: "8px 16px",
                    color: "white",
                    cursor: "pointer",
                    border: "1px solid white",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
                }}
            >
                Aceptar solicitud
            </a>


            </div>
            </div>

        </div>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handlePrev} className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" 
        style={{ width: '200px', marginRight: '5px', position: 'relative', zIndex: 2, boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",border: "1px solid white"}}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            Anterior
        </button>
        <button onClick={handleNext} className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style={{ width: '200px', marginLeft: '5px', position: 'relative', zIndex: 2 , boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",border: "1px solid white"}}>
            Siguiente
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>

        </div>
    ))}
    </div>
);
}


return (
    <div className="App">
    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Cancelación excepcional  - {users.length} solicitudes
    </h1>

    <div className="container">
        {users.length > 0 && <CarruselUsuarios users={users} />}
    </div>

    </div>
);
};
export default MenuCancelaciones;