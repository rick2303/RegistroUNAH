import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import CargarArchivocancelatoriopdf from './CargarArchivoPDFCancel';
import "../tailwind.css"


function ModalCargarPDFCancelaciones() {
    return (
        <>
    {/* <!-- Modal --> */}
    <div class="modal fade" id="ModalCANCEL" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header text-black">
            <h1 class="modal-title fs-5 " id="staticBackdropLabel">Cargar pdf </h1>
            <button type="button" className="btn bg-blue-800 hover:bg-blue-500 text-white shadow" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(false)}>X</button>
        </div>
        <div class="modal-body h-36 pt-10  text-black">
        <CargarArchivocancelatoriopdf />
        </div>

        </div>
    </div>
    </div>
        </>

    )
    }

export default ModalCargarPDFCancelaciones