import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import CargarArchivo from './CargarArchivo';
import "../App.css"


function ModalCargar() {
    
   const {modal, setModal} = React.useState(false);    

 
  return (
    <>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header backdrop-blur min-w-full
          text-white bg-blue-800 text-2xl">
        <h1 className="modal-title fs-5 text-center" id="exampleModalLabel"><strong >Cargar Archivo CSV</strong></h1>
        <button type="button" className="btn boton_cierre" data-bs-dismiss="modal" aria-label="Close">X</button>
      </div>
      <div className="modal-body h-36 pt-10 ">
        <CargarArchivo />
      </div>
      
    </div>
  </div>
</div>
    </>
   
  )
}

export default ModalCargar