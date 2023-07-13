import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Fotos_estudiante from './Fotos_estudiante';
import CargarArchivo from './CargarArchivo';
import "../tailwind.css"


function ModalCargarFotos() {
    
   const [modal, setModal] = React.useState(false);    

 
  return (
    <>
{/* <!-- Modal --> */}
<div class="modal fade" id="example" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header text-black  bg-blue-800">
        <h1 class="modal-title fs-5 " id="staticBackdropLabel"><strong>Cargar fotos</strong></h1>
        <button type="button" class="btn bg-blue-800 hover:bg-blue-500 text-white shadow" data-bs-dismiss="modal" aria-label="Close">X</button>
      </div>
      <div class="modal-body h-36  text-black">
        <div className=' h-8 p-1'><h3> <strong> Solo puedes cargar 3 imagenes máximo.</strong></h3></div>
       
        <div class=" h-36 pt-10  text-black"><Fotos_estudiante />
      </div>
        
      </div>
      
    </div>
  </div>
</div>
    </>
   
  )
}

export default ModalCargarFotos