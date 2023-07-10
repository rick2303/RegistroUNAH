import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { format, parseISO, set } from "date-fns";

const MenuCancelaciones = () => {
const [NumCuenta, setNumCuenta] = useState("");
const [historialData, setHistorialData] = useState([]);
const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
const [users, setUsers] = useState([]);

const fechaActual = new Date();
const año = fechaActual.getFullYear();

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
    showData();

console.log(periodoAcademicoActual);
}, [periodoAcademicoActual, año]);

const showData = async () => {
try {
    const URL = "http://localhost:5000/enviarSolicitudesRealizadasCoordinador";
    const response = await fetch(URL, {
    method: "GET",
    });
    const data = await response.json();
    setHistorialData(data);
    setUsers(data);
    console.log(data);
} catch (error) {
    console.error("Error al obtener los datos:", error);
}

};
// Configuramos las columnas para DataTable
const columnas1 = [
{
    name: "CODIGO",
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
    name: "SECCION",
    selector: (row) => row.Seccion,
},
{
    name: "PERIODO",
    selector: (row) => row.Periodo,
},

];

const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

const handleSelectedRowsChange = (selectedRows) => {
if (selectedRows.selectedCount > 0) {
    const filas = selectedRows.selectedRows;
    setFilasSeleccionadas(filas);
} else {
    setFilasSeleccionadas([]);
}
};

const enviarCancelaciones = async () => {
const razones = document.getElementById(
    "exampleFormControlTextarea1"
).value;
console.log(razones);
console.log(periodoAcademicoActual);

// Crear un arreglo para almacenar los datos de las filas seleccionadas
const datosCancelaciones = [];

// Iterar sobre las filas seleccionadas y agregar los datos al arreglo
filasSeleccionadas.forEach((fila) => {
    const idClase = fila.CODIGO;
    const asignatura = fila.ASIGNATURA;
    const uv = fila.UV;
    const seccion = fila.SECCION;
    const estado = "Pendiente";

    // Agregar los datos al arreglo
    datosCancelaciones.push({
    idClase,
    asignatura,
    uv,
    seccion,
    año,
    periodo: periodoAcademicoActual,
    estado,
    descripcion: razones,
    Id: NumCuenta,
    });
});


   

// Enviar el arreglo de cancelaciones al backend
fetch("http://localhost:5000/subirSolicitudCancelacion", {
    method: "POST",
    body: JSON.stringify(datosCancelaciones), // Enviar el arreglo completo
    headers: {
    "Content-Type": "application/json",
    },
})
    .then((res) => res.json())
    .then((data) => {
    alert("Solicitud procesada exitosamente, ahora suba el archivo PDF");
    });
};

return (
    <div className="App">
    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Solicitudes de cancelación excepcional
    </h1>

    <div className="container">
        {users.length > 0 && (
        <div id="carouselExample" className="carousel slide" data-bs-interval="false">
            <div className="carousel-inner">

            <div className="carousel-item active">
                <img
                src={"../img/uploads/" + users[0].Imagen1}
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
                    {users[0].Nombre} {users[0].Apellido}
                    </p>
                </li>
                <li>
                    <p className="pb-1 text-center">Indice Global: {users[0].IndiceGlobal}</p>
                </li>
                </ul>


                <br></br>
                <div className="table-container" style={{ maxWidth: "1100px", margin: "auto" }}>
                <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
                Darle check a las clases que permite que se le cancelen
                </p>
                <DataTable
                    columns={columnas1}
                    data={historialData}
                    selectableRows
                    onSelectedRowsChange={handleSelectedRowsChange}
                    conditionalRowStyles={[
                    {
                        when: (row) => row.CODIGO === "TU_CODIGO_DE_CONDICION",
                        style: {
                        backgroundColor: "green",
                        color: "white",
                        },
                    },
                    ]}
                />

                <br></br>

                <div className="container">
                <div className="card mx-auto">
                    <div className="card-body p-1">
                    <h2 className="card-title">Razones por la que el estudiante solicita la cancelación:</h2>
                    <p className="card-text">{users[0].Descripcion}</p>
                    </div>
                </div>
                </div>

                <br></br>
                <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a 
                onClick={() => handleDownloadPDF({ NumCuentaEnviada: users[0].NumCuenta})}
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
                <a style={{ 
                    backgroundColor: "#eb5656",
                    borderRadius: "10%",
                    fontSize: "1em",
                    padding: "8px 16px",
                    color: "white",
                    cursor: "pointer",
                    border: "1px solid white",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
                }}>Negar solicitud</a>
                
                <a style={{ 
                    marginLeft: "10px",
                    backgroundColor: "#69c825",
                    borderRadius: "10%",
                    fontSize: "1em",
                    padding: "8px 16px",
                    color: "white",
                    cursor: "pointer",
                    border: "1px solid white",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
                }}>Aceptar solicitud</a>
                </div>

                </div>
                </div>
                </div>
                <br></br>      
            </div>

            <div className="carousel-item">
            <img
                src={"../img/uploads/" + users[0].Imagen1}
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
                    {users[0].Nombre} {users[0].Apellido}
                    </p>
                </li>
                <li>
                    <p className="pb-1 text-center">Indice Global: {users[0].IndiceGlobal}</p>
                </li>
                </ul>


                <br></br>
                <div className="table-container" style={{ maxWidth: "1100px", margin: "auto" }}>
                <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
                Darle check a las clases que permite que se le cancelen
                </p>
                <DataTable
                    columns={columnas1}
                    data={historialData}
                    selectableRows
                    onSelectedRowsChange={handleSelectedRowsChange}
                    conditionalRowStyles={[
                    {
                        when: (row) => row.CODIGO === "TU_CODIGO_DE_CONDICION",
                        style: {
                        backgroundColor: "green",
                        color: "white",
                        },
                    },
                    ]}
                />

                <br></br>

                <div className="container">
                <div className="card mx-auto">
                    <div className="card-body p-1">
                    <h2 className="card-title">Razones por la que el estudiante solicita la cancelación:</h2>
                    <p className="card-text">{users[0].Descripcion}</p>
                    </div>
                </div>
                </div>

                <br></br>
                <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a 
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


                </div>

                </div>

                </div>

                <br></br>

            
            </div>

            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style={{ width: '50px' }}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style={{ width: '50px' }}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
        </div>
        )}

        <br></br>
        <br></br>
    </div>

    </div>
);

};

export default MenuCancelaciones;
