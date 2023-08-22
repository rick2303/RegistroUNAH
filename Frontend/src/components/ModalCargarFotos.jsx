import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Fotos_estudiante from "./Fotos_estudiante";
import CargarArchivo from "./CargarArchivo";
import "../tailwind.css";

function ModalCargarFotos() {
  const [modal, setModal] = React.useState(false);
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  const Rol = userData.data.Rol;

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="example"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header text-white bg-blue-800 text-2xl">
              <h1 class="modal-title fs-5 " id="staticBackdropLabel">
                <strong>Cargar fotos</strong>
              </h1>
              <button
                type="button"
                class="btn text-white shadow"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div class="modal-body h-36  text-black">
              <div className=" h-8 p-1">
                {Rol !== "DOCENTE" ? (
                  <h3>
                    <strong>Solo puedes cargar 3 imágenes máximo.</strong>
                  </h3>
                ) : (
                  <h3>
                    <strong>Solo puedes cargar 1 imagen.</strong>
                  </h3>
                )}
              </div>

              <div class=" h-36 pt-10  text-black">
                <Fotos_estudiante />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalCargarFotos;
