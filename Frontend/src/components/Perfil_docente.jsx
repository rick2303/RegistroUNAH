import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Perfil_estudiante.css";
import ModalCargarFotos from "./ModalCargarFotos";
import EditableParagraph from "./EditarDescEstudiante";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdAddAPhoto } from "react-icons/md";
import {AiOutlineVideoCameraAdd} from "react-icons/ai";
import ModalCargarVideo from "./ModalCargarvideo";

function Perfil_docente() {
  return (
    <>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class=" d-flex justify-content-center">
            <div class=" col-md-12">
              <div class="card user-card-full h-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-6 col-md-2  bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div
                        id="myCarousel"
                        class="carousel slide"
                        data-ride="carousel"
                      >
                        {/*   <!-- Slides --> */}
                        <div
                          id="carouselExampleInterval"
                          class="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div class="carousel-inner ">
                            <div
                              class="carousel-item active rounded-photo"
                              data-bs-interval="10000"
                            >
                              <img
                                src="../img/2.png"
                                class=" d-block w-100"
                                alt="Sin foto de perfil"
                              />
                            </div>
                          </div>
                          <button
                            class="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide="prev"
                          >
                            <span
                              class="carousel-control-prev-icon"
                              aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Previous</span>
                          </button>
                          <button
                            class="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide="next"
                          >
                            <span
                              class="carousel-control-next-icon"
                              aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                      <h5 class="f-w-600">Descripción:</h5>
                      <div>
                        <EditableParagraph />
                      </div>

                      <div class="d-flex justify-content-center align-items-center">
                        <a data-bs-toggle="modal" data-bs-target="#example">
                          <h2 class="m-2">
                            <MdAddAPhoto
                              className="text-2xl fas fa-pencil-alt"
                              title="foto de perfil"
                            />
                          </h2>
                        </a>
                        <ModalCargarFotos />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-10">
                    <div class="card-block">
                      <h5 className="m-b-20 p-b-5 b-b-default f-w-600 row">
                        <p className="col-6">Información general - Pefil docente</p>
                        <div class="d-flex justify-content-end col-6">
                          <a
                            href="../html/Docente.html"
                            className="text-end fas fa-pencil-alt"
                            title="Regresar"
                          >
                            <TiArrowBackOutline className="text-2xl"/>
                          </a>
                        </div>
                      </h5>

                      <div class="row mb-4">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Nombre:</p>
                          <h6 class="text-muted f-w-400">
                            Nestor Adrian Luque
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Correo:</p>
                          <h6 class="text-muted f-w-400">luque.rodriguez.unah.edu.hn</h6>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Centro regional:</p>
                          <h6 class="text-muted f-w-400">
                            Ciudad univerditaria
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Carrera:</p>
                          <h6 class="text-muted f-w-400">
                            Ingeniería en Sistemas
                          </h6>
                        </div>
                      </div>
                      <h5 className="m-b-20 p-b-5 b-b-default f-w-600 row">
                        <p className="col-6">Video descriptivo</p>
                        <div class="d-flex justify-content-end col-6">
                          <a
                            data-bs-toggle="modal" data-bs-target="#docente"
                            className="text-end fas fa-pencil-alt"
                            title="Regresar"
                          >
                            <AiOutlineVideoCameraAdd className="text-2xl" />
                          </a>
                          <ModalCargarVideo />
                        </div>
                      </h5>
                      
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <video
    src="../img/Video docente.mp4"
    controls
    width="500"
    height="400"
  />
</div>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil_docente;
