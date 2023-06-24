import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import CargarArchivo from './CargarArchivo';


function ModalCargar() {
    
   const {modal, setModal} = React.useState(false);    


  return (
    <>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Cargar Archivo CSV</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <CargarArchivo />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
        
      </div>
    </div>
  </div>
</div>
    </>
   
  )
}

export default ModalCargar