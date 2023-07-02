import React from "react";
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Fotos_estudiante from "./Fotos_estudiante";
import "../Perfil_estudiante.css";
import ModalCargarFotos from "./ModalCargarFotos";
import EditableParagraph from "./EditarDescEstudiante";

import { MdAddAPhoto } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function Perfil_estudiante() {
  return (
    <>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class=" d-flex justify-content-center">
            <div class=" col-md-12">
              <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-12 col-md-4  bg-c-lite-green user-profile">
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
                                src="../img/Fotografia.jpeg"
                                class=" d-block w-100"
                                alt="Sin foto de perfil"
                              />
                              
                            </div>
                            <div
                              class="carousel-item rounded-photo"
                              data-bs-interval="10000"
                            >
                              <img
                                src="../img/Fotografia.jpeg"
                                class=" d-block w-100"
                                alt="Sin foto de perfil"
                              />
                            </div>
                            <div
                              class="carousel-item  rounded-photo"
                              data-bs-interval="1000"
                            >
                              <img
                                src="../img/2.png"
                                class="d-block w-100"
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
                            <MdAddAPhoto className="text-2xl" />
                          </h2>
                        </a>
                        <ModalCargarFotos />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <h5 class="m-b-20 p-b-5 b-b-default f-w-600">
                        Information General
                      </h5>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Nombre:</p>
                          <h6 class="text-muted f-w-400">
                            Lleymi Nohemi Cruz Montoya
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Número de cuenta:</p>
                          <h6 class="text-muted f-w-400">20191030723</h6>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Correo:</p>
                          <h6 class="text-muted f-w-400">
                            lleymi.cruz@unah.hn
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Carrera:</p>
                          <h6 class="text-muted f-w-400">
                            Ingeniería en Sistemas
                          </h6>
                        </div>
                      </div>
                      <h5 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Información Académica
                      </h5>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">índicce Global</p>
                          <h6 class="text-muted f-w-400">89%</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">
                            índide del último periodo:
                          </p>
                          <h6 class="text-muted f-w-400">93%</h6>
                        </div>
                      </div>
                      <ul class="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-facebook feather icon-facebook facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="twitter"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-twitter feather icon-twitter twitter"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="instagram"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-instagram feather icon-instagram instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
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

export default Perfil_estudiante;
