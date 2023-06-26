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
          bg-yellow-400">
        <h1 className="modal-title fs-5 text-center" id="exampleModalLabel"><strong >Cargar Archivo CSV</strong></h1>
        <button type="button" className="btn bg-blue-800 hover:bg-blue-500 text-white shadow" data-bs-dismiss="modal" aria-label="Close">X</button>
      </div>
      <div className="modal-body h-36 pt-10 ">
        <CargarArchivo />
      </div>
      {/* <div className="modal-footer backdrop-blur min-w-full
          bg-gradient-to-r from-blue-900 via-yellow-300 to-yellow-400">
        

          
        
         
      </div> */}
    </div>
  </div>
</div>
    </>
   
  )
}

export default ModalCargar