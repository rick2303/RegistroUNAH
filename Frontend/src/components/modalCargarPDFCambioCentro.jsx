import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import CargarArchivoCambioCentropdf from './CargarCambioCentro';
import "../tailwind.css"


function ModalCargarPDFCambioCentroLISTO() {
    return (
        <>
    {/* <!-- Modal --> */}
    <div class="modal fade" id="ModalCAMBIO" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header text-black">
            <h1 class="modal-title fs-5 " id="staticBackdropLabel">Cargar PDF </h1>
            <button type="button" className="btn bg-blue-800 hover:bg-blue-500 text-white shadow" data-bs-dismiss="modal" aria-label="Close">X</button>
        </div>
        <div class="modal-body h-36 pt-10  text-black">
        <CargarArchivoCambioCentropdf />
        </div>

        </div>
    </div>
    </div>
        </>
    )
    }
export default ModalCargarPDFCambioCentroLISTO;