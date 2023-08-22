import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { FcCancel, FcFinePrint } from "react-icons/fc";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styled from 'styled-components';

const MenuCambioCarrera = () => {
const [NumCuenta, setNumCuenta] = useState("");
const [Nombre, setNombre] = useState("");
const [Apellido, setApellido] = useState("");
const [Carrera, setCarrera] = useState("");
const [Centro, setCentro] = useState("");
const [selectedRow, setSelectedRow] = useState(null);
const [IndiceGlobal, setIndiceGlobal] = useState("");
const [PuntajePAA, setPuntajePAA] = useState("");
const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
const [modalOpen, setModalOpen] = useState(false);
const [inputValue, setInputValue] = useState("");
const [carrerasData, setCarreras] = useState([]);
const [InfoEstudiante, setInfoEstudiante] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const fechaActual = new Date();

useEffect(() => {
const storedData = localStorage.getItem("userData");
if (storedData) {
    const userData = JSON.parse(storedData);
    const numCuenta = userData.data.NumCuenta;
    const nombre = userData.data.Nombre;
    const apellido = userData.data.apellido; 
    const carrera = userData.data.Carrera;
    console.log(numCuenta);
    console.log(nombre);
    console.log(apellido);
    setNombre(nombre);
    setApellido(apellido);
    setNumCuenta(numCuenta);
    setCarrera(carrera);
}
fetchInfoAndCarreras(); // Hacer las peticiones de información del estudiante y carreras al cargar la página
}, [NumCuenta]);

const handleCarreraChange = (event) => {
setCarreraSeleccionada(event.target.value);
console.log(event.target.value);
};

const handleSubmit = () => {
const data = {
    NumCuenta: NumCuenta,
    Nombre: Nombre,
    Apellido: Apellido,
    Carrera: Carrera,
    CentroRegional: Centro,
    IndiceGlobal: IndiceGlobal,
    PuntajePAA: PuntajePAA,
    CarreraDeCambio: carreraSeleccionada,
    RazonDeCambio: inputValue,
    FechaSolicitud: fechaActual,
    Dictamen: "EN ESPERA", 
};

console.log(data);

fetch("http://localhost:5000/subirSolicitudCambioCarrera", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
})
    .then((response) => {
    console.log("Solicitud exitosa");
    alert("Solicitud exitosa. Ahora puede realizar el pago para completar el proceso.  --  Pago: Lps. 200.00, revisar estado de cuenta");
    setInputValue("");
    window.location.reload();

    })
    .catch((error) => {
    console.error("Error en la Solicitud", error);
    });
};

const fetchInfoAndCarreras = async () => {
try {
    const [infoRes, carrerasRes, soliRes] = await Promise.all([
    fetch("http://localhost:5000/obtenerInfoEstudiant", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ NumCuenta: NumCuenta }),
    }),
    fetch("http://localhost:5000/carreras"),
    fetch("http://localhost:5000/ObtenerSolicitudCambioCarrera", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ NumCuenta: NumCuenta }),
    }),
    ]);

    const infoData = await infoRes.json();
    const carrerasData = await carrerasRes.json();
    const soliData = await soliRes.json();

    setInfoEstudiante(infoData);
    console.log(infoData);
    setFilteredData(soliData);
    // Eliminar duplicados utilizando un Set y luego convertirlo nuevamente a un array
    const carrerasUnicas = Array.from(new Set(carrerasData));
    setCarreras(carrerasUnicas);
    setCentro(infoData[0].CentroRegional);
    setIndiceGlobal(infoData[0].IndiceGlobal);
    setPuntajePAA(infoData[0].PuntajePAA);
    setCarrera(infoData[0].Carrera);
    console.log(infoData);
    // Manejar los datos de la solicitud obtenidos de soliData, por ejemplo:
    console.log(soliData);

} catch (error) {
    console.error("Error al obtener datos de carreras o información del estudiante:", error);
}
};

const tieneSolicitudesEnEspera = () => {
    // Verificar si el estudiante tiene alguna solicitud "EN ESPERA"
    return filteredData.some((solicitud) => solicitud.Dictamen === "EN ESPERA");
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

const columnas1 = [
    {
    name: <TableHeaderCell>FECHA DE SOLICITUD</TableHeaderCell>,
    selector: (row) => row.FechaSolicitud.split("T")[0],
    cell: row => <TableHeaderCell>{row.FechaSolicitud.split("T")[0]}</TableHeaderCell>
},
{
    name: <TableHeaderCell>CARRERA ACTUAL</TableHeaderCell>,
    selector: (row) => row.Carrera,
    cell: row => <TableHeaderCell>{row.Carrera}</TableHeaderCell>
},
{
    name: <TableHeaderCell>CARRERA DE LA SOLICITUD</TableHeaderCell>,
    width: "200px",
    selector: (row) => row.CarreraDeCambio,
    cell: row => <TableHeaderCell>{row.CarreraDeCambio}</TableHeaderCell>
},
{
    name: <TableHeaderCell>ESTUDIANTE</TableHeaderCell>,
    selector: (row) => row.Nombre + " " + row.Apellido,
    width: "300px",
    cell: row => <TableHeaderCell>{row.Nombre + " " + row.Apellido}</TableHeaderCell>
},
{
    name: "DICTAMEN",
    selector: (row) => row.Dictamen,
},
{
    name: "ESTADO",
    selector: (row) => row.Estado.toUpperCase(),
},
{
    name: "VER",
    cell: (row) => (
    <h1 className="cursor-pointer" onClick={() => mostrarInformacion(row)}>
        <FcFinePrint />
    </h1>
    ),
},
{
    name: "ELIMINAR",
    cell: (row) => (
    <h1 className="cursor-pointer" onClick={() => EliminarInformacion(row)}>
        <FcCancel />
    </h1>
    ),
},
];
const NoDataComponent = () => {
    return <div>No hay registros para mostrar</div>;
};

const mostrarInformacion = (row) => {
    setSelectedRow(row);
    
    toggleModal();
};



const EliminarInformacion = (row) => {
    // Verificar que el valor de IdSolicitud sea un número válido
    console.log(row.IdSolicitud);
    const IdSolicitud = parseInt(row.IdSolicitud);
    console.log(IdSolicitud);
    if (isNaN(IdSolicitud)) {
        console.error('El valor de IdSolicitud no es un número válido.');
        return;
    }

    fetch("http://localhost:5000/eliminarSolicitudCambioCarrera", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ IdSolicitud: IdSolicitud }),
    })
    .then((res) => {
        if (!res.ok) {
            console.error('La respuesta no fue exitosa:', res.status, res.statusText);
            throw new Error('La solicitud no pudo ser eliminada.');
        }
        return res.json(); // Parsear la respuesta como JSON
    })
    .then((data) => {
        console.log("Solicitud eliminada exitosamente");
        alert("Solicitud eliminada exitosamente");
        window.location.reload();
    })
    .catch((error) => {
        console.error("Error en la eliminación de la solicitud", error);
    });
};

const toggleModal = () => {
    setModalOpen(!modalOpen);
};

return (
    <div className="App">
    <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
    Cambio de Carrera
    </h1>
    {InfoEstudiante.length > 0 && (
    <div className="container ">
    <div className="row">

    <div className="col-md-6 border-1" style={{ borderRadius: "5px", padding: "10px", border: "1px solid #c6c6c6" }}>
    <p className="pt-2 pb-1 text-center">Centro de estudios: {InfoEstudiante[0].CentroRegional}</p>
    <p className="pt-2 pb-1 text-center">Carrera actual: {InfoEstudiante[0].Carrera}</p>
    </div>

    <div className="col-md-6 border-1" style={{ borderRadius: "5px", padding: "10px", border: "1px solid #c6c6c6" }}>
    <p className="pt-2 pb-1 text-center">Indice global: {InfoEstudiante[0].IndiceGlobal} %</p>
    <p className="pt-2 pb-1 text-center">Indice de admisión: {InfoEstudiante[0].PuntajePAA}</p>
    </div>

    <br />


    <div className="container pt-5 ">
        <label htmlFor="carrera" >Seleccione la carrera a la cual desea hacer el cambio: </label>
        <br />
        <br />
        <select
        className="form-select border-1 w-50"
        id="carrera"
        style={{border: "1px solid #c6c6c6 ",borderRadius: "5px"}}
        aria-label="Default select example"
        value={carreraSeleccionada}
        onChange={handleCarreraChange}
        >
        <option></option>
        {carrerasData.map((carrera) => (
            // Solo usamos "carrera" como nombre de variable
            <option key={carrera} value={carrera}>
            {carrera}
            </option>
        ))}
        </select>
    </div>

    <p className="pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
        Razones por las cuales desea realizar este cambio de carrera:
    </p>

    <div className="d-flex align-items-center">
        <div className="mb-2 me-2 w-75"   style={{border: "1px solid #c6c6c6 ",borderRadius: "5px"}}>
        <textarea
            className="form-control form-control-sm border  p-4 rounded"

            id="exampleFormControlTextarea1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        </div>

        <div className="grid grid-cols-1">
        <button type="button" className="btn btn-success" onClick={handleSubmit} disabled={tieneSolicitudesEnEspera()}>
            Enviar Solicitud
        </button>
        </div>
    </div>
        <h1 className="text-2xl text-center font-bold pt-4 pb-3 text-gray-900 sm:text-3xl">
        Solicitudes realizadas
        </h1>
        <p className="pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
            Para que el coordinador pueda revisar su solicitud realice el pago que le aparece en su estado de cuenta.
        </p>
        <br />
    </div>
    <DataTable
        columns={columnas1}
        className="mi-tabla"
        data={filteredData}
        noDataComponent={<NoDataComponent />}
        customStyles={customStyles}
        />
    {selectedRow && (
        <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader className="text-white bg-blue-800 text-2xl">
                <strong>Solicitud realizada</strong>
                <button className="close boton_cierre" onClick={toggleModal}>
                <span aria-hidden="true">X</span>
                </button>
            </ModalHeader>
            <ModalBody>
                <ul>
                <li>
                    <strong>Fecha de solicitud:</strong> {selectedRow.FechaSolicitud.split("T")[0]}
                </li>
                <li>
                    <strong>Carrera actual:</strong> {selectedRow.Carrera}
                </li>
                <li>
                    <strong>Carrera a la que quiere hacer el cambio:</strong> {selectedRow.CarreraDeCambio}
                </li>
                <li>
                    <strong>Nombre:</strong> {selectedRow.Nombre + " " + selectedRow.Apellido}
                </li>
                <li>
                    <strong>Dictamen:</strong> {selectedRow.Dictamen}
                </li>
                <li>
                    <strong>Estado:</strong> {selectedRow.Estado}
                </li>
                <li>
                    <strong>Justificacion por parte del coordinador:</strong> {selectedRow.JustificacionCoordi}
                </li>
                </ul>
            </ModalBody>
            </Modal>
        )}

    </div>
    )}
</div>
);

};

export default MenuCambioCarrera;