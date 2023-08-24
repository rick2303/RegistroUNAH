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
function ModalAgregarContacto({ isOpen, onClose }) {
  const [NumCuenta, setNumCuenta] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [estudiante, setEstudiante] = useState([]);
  const [NumCuentaPropio, setNumCuentaPropio] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const numCuenta = userData.data.NumCuenta;
      console.log(numCuenta);
      setNumCuentaPropio(numCuenta);
    }
  }, []);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm !== "") {
      setNumCuenta(newSearchTerm);
      fetchEstudiante(newSearchTerm);
    } else {
      setEstudiante(null);
    }
  };

  const filteredEstudiante = estudiante && estudiante.NumCuenta === searchTerm ? estudiante : null;

  const handleCloseModal = () => {
    setSearchTerm("");
    onClose();
  };

  const handleEnviarSolicitud = (row) => {
    const NumCuentaAmigo = row.NumCuenta;
    fetchSolicitud(NumCuentaAmigo);
    setSearchTerm("");
    
  };

  const fetchEstudiante = async (NumCuenta) => {
    try {
      const response = await fetch('http://localhost:5000/buscarEstudiante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          NumCuenta: NumCuenta
        })
      });
      if (response.ok) {
        const data = await response.json();
        setEstudiante(data); // Store fetched data in state
        console.log(data)
      }
    } catch (error) {
      console.error('Error fetching estudiante:', error);
    }
  };

  const fetchSolicitud = async (NumCuentaAmigo) => {
    try {
      const response = await fetch('http://localhost:5000/enviarSolicitudAmistad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          NumCuentaAmigo: NumCuentaAmigo,
          NumCuentaPropietario: NumCuentaPropio
        })
      });
      const data = await response.json();
      if (data.status === 200) {
        console.log(data);
        alert(data.message);
        onClose();
      } else {
        alert(data.message)
        onClose();
      }
    } catch (error) {
      console.error('Error fetching solicitud:', error);
    }
  };


  const columnas = [
    {
      name: 'NUMCUENTA',
      selector: row => row.NumCuenta,
      width: "240px"

    },
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
      selector: row => row.Carrera,
      center: true,
    },
    {
      name: 'ENVIAR SOLICITUD',
      selector: (row) => (
        <button className="btn btn-link" onClick={() => handleEnviarSolicitud(row)}>
          <i className="fa fa-paper-plane btn-lg"></i>
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
            <strong>Agregar Contacto</strong>
          </h1>
          <button type="button" className="btn boton_cierre" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>X</button>
        </ModalHeader>
        <ModalBody className="h-100 pt-10 text-black text-center"> {/* Agregamos la clase text-center */}
          <div className="container">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar por número de cuenta"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <br />
            {searchTerm !== "" && estudiante ? (
              NumCuentaPropio === searchTerm ? (
                <NoDataComponent />
              ) : (
                estudiante.NumCuenta === searchTerm && (
                  <DataTable
                    columns={columnas}
                    data={[estudiante]} // Wrap estudiante in an array
                    paginationComponentOptions={paginationComponentOptions}
                    maxHeight="60vh"
                  />
                )
              )
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

export default ModalAgregarContacto;

