import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Fotos_estudiante from "./Fotos_estudiante";
import "../Perfil_estudiante.css";
import ModalCargarFotos from "./ModalCargarFotos";
import EditableParagraph from "./EditarDescEstudiante";
import EditableEmail from "./EditarCorreoEstudiante";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdAddAPhoto } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import imgDefault from "../img/uploads/1688323336413-804346209-64572.png"

function Perfil_estudiante() {
  const [descripcion, setDescripcion] = useState("");
  const [imagen1, setImagen1] = useState("");
  const [imagen2, setImagen2] = useState("");
  const [imagen3, setImagen3] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numCuenta, setNumCuenta] = useState("");
  const [correoInstitucional, setCorreoInstitucional] = useState("");
  const [carrera, setCarrera] = useState("");
  const [indiceGlobal, setIndiceGlobal] = useState("");
  const [correoPersonal, setCorreoPersonal] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);

      const nombre = userData.data.Nombre;
      setNombre(nombre);
      const apellido = userData.data.apellido;
      setApellido(apellido);
      const numCuenta = userData.data.NumCuenta;
      setNumCuenta(numCuenta);
      const correoInstitucional = userData.data.CorreoInstitucional;
      setCorreoInstitucional(correoInstitucional);
      const carrera = userData.data.Carrera;
      setCarrera(carrera);
      const indiceGlobal = userData.data.IndiceGlobal;
      setIndiceGlobal(indiceGlobal);
      const correoPersonal = userData.data.CorreoPersonal;
      setCorreoPersonal(correoPersonal);

      if (!userData.perfil.Imagen1) {
        const imagen1 = "1688323336413-804346209-64572.png";
        setImagen1(imagen1);
        console.log("No hay imagen 1");
    } else {
        const imagen1 = userData.perfil.Imagen1;
        setImagen1(imagen1);
    }
    
    if (!userData.perfil.Imagen2) {
        const imagen2 = "1688323336413-804346209-64572.png";
        setImagen2(imagen2);
        console.log("No hay imagen 2");
    } else {
        const imagen2 = userData.perfil.Imagen2;
        setImagen2(imagen2);
    }
    
    if (!userData.perfil.Imagen3) {
        const imagen3 = "1688323336413-804346209-64572.png";
        setImagen3(imagen3);
        console.log("No hay imagen 3");
    } else {
        const imagen3 = userData.perfil.Imagen3;
        setImagen3(imagen3);
    }
    
    const descripcion = userData.perfil.Descripcion;
    setDescripcion(descripcion);
    
    }
  }, []);

  return (
    <>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class=" d-flex justify-content-center">
            <div class=" col-md-12">
              <div class="card user-card-full h-full">
                <div class="row m-l-0 m-r-0">
                <div class="col-sm-6 col-md-2  user-profile" style={{background: "#145eb9"}}>
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
                                src={`../img/uploads/${imagen1}`}
                                class=" d-block-estudiante w-100"
                                alt="Sin foto de perfil"
                              />
                            </div>
                            <div
                              class="carousel-item rounded-photo"
                              data-bs-interval="10000"
                            >
                              <img
                                src={`../img/uploads/${imagen2}`}
                                class=" d-block-estudiante w-100"
                                alt="Sin foto de perfil"
                              />
                            </div>
                            <div
                              class="carousel-item  rounded-photo"
                              data-bs-interval="1000"
                            >
                              <img
                                src={`../img/uploads/${imagen3}`}
                                class="d-block-estudiante w-100"
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
                            <span class="visually-hidden">Anterior</span>
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
                            <span class="visually-hidden">Siguiente</span>
                          </button>
                        </div>
                      </div>
                      <br></br>
                      <h3 class="f-w-600 text-xl">Descripción:</h3>
                      <div>
                        <EditableParagraph descripcion={descripcion} />
                      </div>

                      <div class="d-flex justify-content-center align-items-center">
                        <a data-bs-toggle="modal" data-bs-target="#example">
                          <h2 class="m-2">
                            <MdAddAPhoto
                              className="text-2xl fas fa-pencil-alt cursor-pointer"
                              title="Foto de perfil"
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
                        <label className="col-6">Información general</label>
                        <div class="d-flex justify-content-end col-6">
                          <a
                            href="../html/Estudiante.html"
                            className="text-end fas fa-pencil-alt"
                            title="Regresar"

                          >
                            <label><TiArrowBackOutline 
                            style={{ color: "#145eb9" }}
                            className="cursor-pointer"/></label>
                          </a>
                        </div>
                      </h5>

                      <div class="row mb-5">
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Nombre:</hatch>
                          <h6 class="text-muted f-w-00">
                            {nombre} {apellido}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Número de cuenta:</hatch>
                          <h6 class="text-muted f-w-400">{numCuenta}</h6>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Correo institucional:</hatch>
                          <h6 class="text-muted f-w-400">
                            {correoInstitucional}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Carrera:</hatch>
                          <h6 class="text-muted f-w-400">{carrera}</h6>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Correo personal:</hatch>
                          <h6 class="text-muted f-w-400">
                          <EditableEmail CorreoPersonal={correoPersonal}/>
                            
                          </h6>
                        </div>
                        
                      
                      </div>
                      <h5 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        <label>Información académica</label>
                      </h5>
                      <div class="row mb-5">
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">índice Global</hatch>
                          <h6 class="text-muted f-w-400">{indiceGlobal}</h6>
                        </div>
                        {/* <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">
                            índide del último periodo:
                          </p>
                          <h6 class="text-muted f-w-400">93%</h6>
                        </div> */}
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

export default Perfil_estudiante;
