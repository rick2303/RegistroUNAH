import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function ModalCargaAcademica({ isOpen, onClose }) {
    const [Departamento, setDepartamento] = useState("");
    const [CentroRegional, setCentroRegional] = useState("");
    const [Sistema, setSistema] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          const departamento = userData.data.Carrera;
          const centroregional = userData.data.CentroRegional
          const sistema = userData.data.Sistema;
          setSistema(sistema)
          setCentroRegional(centroregional)
          setDepartamento(departamento);
        }
      }, []);

    const descargarCargaAcademicaPDF = async () => {
        const URL = `http://localhost:5000/cargaAcademicaPDF`;
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Departamento: Departamento, CentroRegional:CentroRegional, Sistema: Sistema}),
        });
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/pdf" });
      
        const url = window.URL.createObjectURL(blob);
      
        const a = document.createElement("a");
        a.href = url;
        a.download = `Carga_Academica_${Departamento}.pdf` // Nombre del archivo PDF que se descargará
        a.click();
      
        // Limpia la URL y elimina el objeto Blob
        window.URL.revokeObjectURL(url);
      };

      const descargarCargaAcademicaEXCEL = async () => {
        const URL = `http://localhost:5000/cargaAcademicaEXCEL`;
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Departamento: Departamento, CentroRegional:CentroRegional,Sistema: Sistema }),
        });
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/xlsx" });
      
        const url = window.URL.createObjectURL(blob);
      
        const a = document.createElement("a");
        a.href = url;
        a.download = `Carga_Academica_${Departamento}.xlsx` // Nombre del archivo PDF que se descargará
        a.click();
      
        // Limpia la URL y elimina el objeto Blob
        window.URL.revokeObjectURL(url);
      };

  
      return (
        <>
          {/* <!-- Modal --> */}
          <Modal isOpen={isOpen} toggle={onClose} className="modal-dialog">
            <ModalHeader className="text-black">
              <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">
                <strong>Descargar carga académica</strong>
              </h1>
              <button type="button" className="btn boton_cierre" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>X</button>
            </ModalHeader>
            <ModalBody className="h-36 pt-10 text-black text-center"> {/* Agregamos la clase text-center */}
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <button type="button" data-bs-dismiss="modal" aria-label="Close" onClick={descargarCargaAcademicaPDF} className="btn btn-primary btn-lg">Descargar PDF</button>
                  </div>
                  <div className="col-md-6">
                    <button type="button" data-bs-dismiss="modal" aria-label="Close" onClick={descargarCargaAcademicaEXCEL} className="btn btn-primary btn-lg">Descargar EXCEL</button>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter style={{ marginTop: '10px' }}>
              {/* Aquí puedes colocar botones de acción si es necesario */}
            </ModalFooter>
          </Modal>
        </>
      );
    }

export default ModalCargaAcademica;

