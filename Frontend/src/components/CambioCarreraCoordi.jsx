import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "styled-components";


const MenuCambioCarreraCoordi = () => {
const [NumCuenta, setNumCuenta] = useState("");
const [users, setUsers] = useState([]);
const [carrera, setCarreraUsuario] = useState("");
const [centroRegional, setCentroRegional] = useState("");
const [numeroSolicitud, setNumeroSolicitud] = useState("");
const [inputValue, setInputValue] = useState("");
const [carreraCambioEstudiante, SetCarreraCambioEstudiante] = useState("");

useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
        const userData = JSON.parse(storedData);
        const Carrera = userData.data.Carrera;
        const CentroRegional = userData.data.CentroRegional;
        console.log("Carrera del usuario:", Carrera);
        console.log("Centro Regional del usuario:", CentroRegional);
        setCarreraUsuario(Carrera);
        setCentroRegional(CentroRegional);
    }
    showData();
}, [carrera, centroRegional]);


const showData = async () => {
    //OBTENER LOS PERIFLES DE LOS ESTUDIANTES
try {
    console.log("La carrera es: ", carrera);
    console.log("El centro regional es: ", centroRegional);
    const URL = "http://localhost:5000/ObtenerSolicitudesCambioCarreraCoordinador";
    const response = await fetch(URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ carreraCambio: carrera, centroRegional: centroRegional}),
        
    })
        .then((res) => res.json())
        .then((data) => {
            setUsers(data);
            setNumeroSolicitud(data[0].IdSolicitud);
            SetCarreraCambioEstudiante(data[0].CarreraDeCambio);
            console.log("CAMBIO DE CARRERA DEL ESTUDIANTE:", data[0].CarreraDeCambio);
            console.log(data);
    });
} catch (error) {
    console.error("Error al obtener los datos:", error);
}

};



function CarruselUsuarios({ users }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentNumCuenta, setCurrentNumCuenta] = useState("");

    const enviarCancelacionesCoordiACEPTADA = async (cuentaSend) => {
        const NumCuenta = cuentaSend.toString();
        console.log("El numero de cuenta es: ", NumCuenta);
        const Estado = "APROBADO";
        console.log("el id de la clase es: ", numeroSolicitud);
        
        // Solicitar al usuario que ingrese una justificación
        const justificacion = prompt("Colocar una Justificacion de la respuesta:");
    
        if (justificacion !== null && justificacion.trim() !== "") {
            const dictamenData = {
                numCuenta: NumCuenta,
                dictamen: Estado,
                idSolicitud: numeroSolicitud,
                justificacion: justificacion
            };
        
            const cambiarCarreraData = {
                NumCuenta: NumCuenta,
                Carrera: carreraCambioEstudiante
            };
            console.log("Dictamen:", dictamenData);
            console.log("Cambio de carrera:", cambiarCarreraData.Carrera);
        
            const enviarDictamenPromise = fetch("http://localhost:5000/EnviarDictamenCambioCarrera", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dictamenData)
            });
        
            const realizarCambioPromise = fetch("http://localhost:5000/realizarCambioDeCarrera", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cambiarCarreraData)
            });
        
            Promise.all([enviarDictamenPromise, realizarCambioPromise])
                .then((responses) => Promise.all(responses.map((response) => response.json())))
                .then((data) => {
                    const [dictamenData, cambioCarreraData] = data;
                    console.log("Dictamen:", dictamenData);
                    console.log("Cambio de carrera:", cambioCarreraData);
                    if (dictamenData.message === "Error al procesar la solicitud") {
                        console.error("Error al enviar las cancelaciones:", dictamenData.message);
                    } else {
                        console.log(data);
                        alert("Respuesta enviada al estudiante con éxito");
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.error("Error al enviar el cambio de carrera:", error);
                });
        } else {
            alert("No se ha enviado la respuesta");
        }
        

    };
    
    
    

    const enviarCancelacionesCoordiRECHAZADA = async (cuentaSend) => {

        const NumCuenta = cuentaSend.toString();
        console.log("El numero de cuenta es: ", NumCuenta);
        const Estado = "RECHAZADO";
        console.log("el id de la clase es: ", numeroSolicitud);
        
        // Solicitar al usuario que ingrese una justificación
        const justificacion = prompt("Colocar una Justificacion de la respuesta:");
    
        if (justificacion !== null && justificacion.trim() !== "") {

        return fetch("http://localhost:5000/EnviarDictamenCambioCarrera", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ numCuenta: NumCuenta, dictamen: Estado, idSolicitud: numeroSolicitud, justificacion: justificacion }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Error al procesar la solicitud") {
            console.error("Error al enviar las cancelaciones:", data.message);
            } else {
            console.log(data);
            alert("Respuesta enviada al estudiante con éxito");
            window.location.reload();
            }
        })
        .catch((error) => {
            console.error("Error al enviar el cambio de carrera:", error);
        });
    } else {
        alert("No se ha enviado la respuesta");
    }
    };


useEffect(() => {
    if (users.length > 0) {
    setCurrentNumCuenta(users[activeIndex].NumCuenta);
    }
}, [users, activeIndex]);


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
            <li>
            <p className="pb-1 text-center">
                Puntaje PAA: {user.PuntajePAA}
            </p>
            </li>
            <li>
            <p className="pb-1 text-center">
                Puntaje PAM: {user.PuntajePAM}
            </p>
            </li>
            <li>
            <p className="pb-1 text-center">
                Puntaje PCCNS: {user.PuntajePCCNS}
            </p>
            </li>
        </ul>


        <br></br>
        <div className="table-container" style={{ maxWidth: "1100px", margin: "auto" , position: "relative", zIndex: 1 }}>
        </div>

        <br></br>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize:"20px" }} >Actual carrera del estudiante: {user.Carrera}</h2>
        <br></br>
            <div className="card mx-auto">
            <div className="card-body p-1">
                <h2 className="card-title">Razones por la que el estudiante solicita el cambio de carrera:</h2>
                <p className="card-text">{user.RazonDeCambio}</p>
            </div>
            </div>
        </div>


        <br></br>
        <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            marginRight: "10px", // Opcional: para agregar un espacio entre los botones
            }}
        >
            Negar solicitud
        </a>

        <a
            onClick={() => enviarCancelacionesCoordiACEPTADA(user.NumCuenta)}
            type="button"
            style={{
            backgroundColor: "#69c825",
            borderRadius: "10%",
            fontSize: "1em",
            padding: "8px 16px",
            color: "white",
            cursor: "pointer",
            border: "1px solid white",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
        >
            Aceptar solicitud
        </a>
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
        Cambio de carrera  - {users.length} solicitudes
    </h1>

    <div className="container">
        {users.length > 0 && <CarruselUsuarios users={users} />}
    <div className="pt-50">


    </div>
    </div>
    </div>
);
};
export default MenuCambioCarreraCoordi;