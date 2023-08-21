import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import VideoDocente from './VideoDocente';
import "../tailwind.css"


function ModalCargarVideo() {
    
   const [modal, setModal] = React.useState(false);    

 
  return (
    <>
{/* <!-- Modal --> */}
<div class="modal fade" id="docente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header  text-white bg-blue-800 text-2xl">
        <h1 class="modal-title fs-5 " id="staticBackdropLabel">Cargar video descriptivo</h1>
        <button  style={{ color: "#145eb9" }} type="button" class="btn text-white shadow" data-bs-dismiss="modal" aria-label="Close">X</button>
      </div>
      <div class="modal-body h-36 pt-10  text-black">
        <VideoDocente />
      
      </div>
      
    </div>
  </div>
</div>
    </>
   
  )
}

export default ModalCargarVideo