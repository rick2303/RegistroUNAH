import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Perfil_estudiante.css";
import ModalCargarFotos from "./ModalCargarFotos";
import EditableParagraph from "./EditarDescEstudiante";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdAddAPhoto } from "react-icons/md";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import ModalCargarVideo from "./ModalCargarvideo";
import EditableEmail from "./EditarCorreoEstudiante";
function Perfil_docente() {
  const [nombre, setNombre] = useState("");
  const [centroRegional, setCentroRegional] = useState("");
  const [correoInstitucional, setCorreoInstitucional] = useState("");
  const [correoPersonal, setCorreoPersonal] = useState("");
  const [carrera, setCarrera] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [video, setVideo] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      
      const nombre = userData.data.Nombre + " " + userData.data.Apellido;
      setNombre(nombre);
      const centroRegional = userData.data.CentroRegional;
      setCentroRegional(centroRegional);
      const correoInstitucional = userData.data.CorreoInstitucional;
      setCorreoInstitucional(correoInstitucional);
      const correoPersonal = userData.data.CorreoPersonal;
      setCorreoPersonal(correoPersonal);
      const carrera = userData.data.Carrera;
      setCarrera(carrera);
     
      
      if(!userData.perfil ){
        const imagen = '1688323336413-804346209-64572.png';
        setImagen(imagen);
        const video = '../Video docente.mp4';
        setVideo(video);
      }else{
        const imagen = userData.perfil.Imagen1;
        setImagen(imagen);
        const video = userData.perfil.Video;
        setVideo(video);
      }
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
                                src={`../img/uploads/${imagen}`}
                                class=" d-block-docente w-100"
                                alt="Sin foto de perfil"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <h4 class="f-w-600 text-xl">Descripción:</h4>
                      <div>
                        <EditableParagraph descripcion={descripcion} />
                      </div>

                      <div class="d-flex justify-content-center align-items-center">
                        <a data-bs-toggle="modal" data-bs-target="#example">
                          <h2 class="m-2">
                            <MdAddAPhoto
                              className="text-2xl fas fa-pencil-alt cursor-pointer"
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
                      <label className="col-6">Información general</label>
                        <div class="d-flex justify-content-end col-6">
                          <a
                            href="../html/Docente.html"
                            className="text-end fas fa-pencil-alt"
                            title="Regresar"
                          ><label>
                            <TiArrowBackOutline className="cursor-pointer" 
                            style={{ color: "#145eb9" }}/>
                            </label>
                          </a>
                        </div>
                      </h5>

                      <div class="row mb-5">
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Nombre:</hatch>
                          <h6 class="text-muted f-w-400">{nombre}</h6>
                        </div>
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Correo Institucional:</hatch>
                          <h6 class="text-muted f-w-400">
                            {correoInstitucional}
                          </h6>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Centro regional:</hatch>
                          <h6 class="text-muted f-w-400">{centroRegional}</h6>
                        </div>
                        <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Carrera:</hatch>
                          <h6 class="text-muted f-w-400">{carrera}</h6>
                        </div>
                      </div>
                      <div class="row mb-5">
                      <div class="col-sm-6">
                          <hatch class="m-b-10 f-w-600">Correo Personal:</hatch>
                          <h6 class="text-muted f-w-400">
                          <EditableEmail CorreoPersonal={correoPersonal}/>
                          </h6>
                        </div>
                      </div>
                      <h5 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 row">
                        <label className="col-6">Video descriptivo</label>
                        <div class="d-flex justify-content-end col-6">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#docente"
                            className="text-end fas fa-pencil-alt"
                            title="Cargar video"
                          >
                            <label><AiOutlineVideoCameraAdd className="cursor-pointer" 
                            style={{ color: "#145eb9" }}/></label>
                          </a>
                          <ModalCargarVideo />
                        </div>
                      </h5>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <video src={`../img/uploads/${video}`} controls width="47%" />
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
