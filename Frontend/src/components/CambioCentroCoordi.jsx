
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "styled-components";

const MenuCambioCentroCoordi = () => {
    const [NumCuenta, setNumCuenta] = useState("");
    const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
    const [users, setUsers] = useState([]);
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const [centroRegional, setCentroRegional] = useState("");
    
    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const userData = JSON.parse(storedData);
            const CentroRegional = userData.data.CentroRegional;
            setCentroRegional(CentroRegional);
        }
        showData();
    }, []);
    
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


    const descargarJustificacion = async (cuenta) => {
        const URL = `http://localhost:5000/descargarPDFCambioCarrera/${cuenta}`;
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/pdf" });
      
        const url = window.URL.createObjectURL(blob);
      
        const a = document.createElement("a");
        a.href = url;
        a.download = `Justificacion-${cuenta}.pdf`
        a.click();
      
        window.URL.revokeObjectURL(url);
      };
    
      
  const DescargarPdf = () => {
    descargarJustificacion();
  };
    
    
    const showData = async () => {
        //OBTENER LOS PERIFLES DE LOS ESTUDIANTES
    try {
        const URL = "http://localhost:5000/CambioCentroCoordi";
        const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({CentroRegional:"VS"}),
            
        })
            .then((res) => res.json())
            .then((data) => {
              
                setUsers(data);
                
                console.log(data)
                for (const i of data)
                {
                    console.log(i);
                    
                }
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
    };

    const handleSubmit = (event) => {
    event.preventDefault(); // Evitar la recarga de la página al enviar el formulario
    };
   
    
    function CarruselUsuarios({ users }) {
        const [activeIndex, setActiveIndex] = useState(0);
        const [currentNumCuenta, setCurrentNumCuenta] = useState("");

    
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
    
            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a 
                    onClick={()=>DescargarPdf(user.NumCuenta)}
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
            Cambio de Centro - {users.length} solicitudes
        </h1>
    
        <div className="container">
        {users.length > 0 && <CarruselUsuarios users={users} />}
        </div>
    
        </div>
    );
    };

export default MenuCambioCentroCoordi;