import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import DataTable from 'react-data-table-component';
const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
function ModalSolicitudesAmistad({ isOpen, onClose }) {
    const [NumCuenta, setNumCuenta] = useState("");
    const [NumCuentaPropio, setNumCuentaPropio] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataContactosEspera, setDataContactosEspera] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const userData = JSON.parse(storedData);
            const numCuenta = userData.data.NumCuenta;
            console.log(numCuenta);
            setNumCuentaPropio(numCuenta);

        }
        ContactosEspera()
    }, [NumCuentaPropio, isOpen]);

    const handleCloseModal = () => {
        onClose();
    };

    const ContactosEspera = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/contactosEspera', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    NumCuenta: NumCuentaPropio
                })
            });
            if (response.ok) {
                const data = await response.json();
                setDataContactosEspera(data); // Store fetched data in state
            }
        } catch (error) {
            console.error('Error fetching solicitud:', error);
        } finally {
            setLoading(false);
        }
    }

    const AceptarSolicitud = async (idEstudianteAgregado) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:5000/aceptarSolicitud/${NumCuentaPropio}/${idEstudianteAgregado}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // const data = await response.json();
            alert('Solicitud de amistad aceptada');
            ContactosEspera();
            

        } catch (error) {
            console.error('Error Aceptar solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    const RechazarSolicitud = async (idEstudianteAgregado) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:5000/rechazarSolicitud/${NumCuentaPropio}/${idEstudianteAgregado}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            //const data = await response.json();
            alert('Usuario rechazado');
            ContactosEspera();


        } catch (error) {
            console.error('Error Aceptar solicitud:', error);
        } finally {
            setLoading(false);
        }
    };


    const columnas = [
        {
            name: 'NOMBRE',
            selector: row => row.Nombre + " " + row.Apellido,
            center: true,
        },
        {
            name: 'CORREO',
            selector: row => row.CorreoInstitucional,
            center: true,
        },
        {
            name: 'CARRERA',
            selector: row => row.Carrera.toUpperCase(),
            center: true,
        },
        {
            name: 'ACEPTAR SOLICITUD',
            selector: (row) => (
                <button
                    className="btn btn-link"
                    onClick={() => AceptarSolicitud(row.IdEstudianteAgregado)}
                >
                    <i className="fa fa-check btn-lg"></i>
                </button>
            ),
            center: true,
        },
        {
            name: 'RECHAZAR SOLICITUD',
            selector: (row) => (
                <button className="btn btn-link" onClick={() => RechazarSolicitud(row.IdEstudianteAgregado)} >
                    <i className="fa fa-times btn-lg"></i>
                </button>
            ),
            center: true,
        }
    ]
    const NoDataComponent = () => {
        return <div>No hay registros para mostrar</div>;
    };

    return (
        <>
            {/* <!-- Modal --> */}
            <Modal isOpen={isOpen} toggle={handleCloseModal} className="modal-dialog" style={{ maxWidth: '1500px', width: '80%' }}>
                <ModalHeader className="text-white " style={{backgroundColor:'#1E40AF'}}>
                    <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">
                        <strong>Solicitudes de contacto</strong>
                    </h1>
                    <button type="button" className="btn boton_cierre" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>X</button>
                </ModalHeader>
                <ModalBody className="h-100 pt-10 text-black text-center"> {/* Agregamos la clase text-center */}
                    <div className="container">
                        <br />
                        {loading ? (
                            <div>Cargando...</div>
                        ) : dataContactosEspera.length > 0 ? (
                            <DataTable
                                columns={columnas}
                                data={dataContactosEspera}
                                paginationComponentOptions={paginationComponentOptions}
                                maxHeight="60vh"
                            />
                        ) : (
                            <NoDataComponent />
                        )}
                    </div>
                </ModalBody>
                <ModalFooter style={{ marginTop: '10px' }}>
                    {/* Aquí puedes colocar botones de acción si es necesario */}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalSolicitudesAmistad;

