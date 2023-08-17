//import React from "react";
import React, { useEffect, useState } from "react";
import { FcBarChart, FcInspection, FcOk, FcOpenedFolder, FcOvertime} from "react-icons/fc";
import {
  FcConferenceCall,
  FcTimeline,
  FcDiploma1,
} from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css";
import EstadoCuenta from "./Estado_Cuenta";
import { format, parseISO, set } from "date-fns";

function MenuEstudiante() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [Sistema, setSistema] = useState("");
  const [indiceGlobal, setIndiceGlobal] = useState(0);
  const fechaActual = new Date();
  const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
  const añoActual = fechaActual.getFullYear();
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
  const day = String(fechaActual.getDate()).padStart(2, "0");
  const fechaActualString = `${year}-${month}-${day}`;
  const [DataFechas, setDatasFechas] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const nombre = userData.data.Nombre;
      const apellido = userData.data.apellido;
      setApellidoUsuario(apellido);
      setNombreUsuario(nombre);
      setIndiceGlobal(userData.data.IndiceGlobal);
      setSistema(userData.data.Sistema)
      console.log(userData.data.IndiceGlobal);
    }
  }, []);

  
const obtenerFechasMinMaxIPAC = async () => {
  try {
      const response = await fetch(
      "http://localhost:5000/enviarPlanificacionIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
  
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
      setPeriodoAcademicoActualPAC("1PAC");
      }
  } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
  }
  };
  
  const obtenerFechasMinMaxIIPAC = async () => {
  try {
      const response = await fetch(
      "http://localhost:5000/enviarPlanificacionIIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
  
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
      setPeriodoAcademicoActualPAC("2PAC");
      }
  } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
  }
  };
  
  const obtenerFechasMinMaxIIIPAC = async () => {
  try {
      const response = await fetch(
      "http://localhost:5000/enviarPlanificacionIIIPAC"
      );
      const data = await response.json();
      const fechamin = parseISO(data[0].FechaInicio);
      const fechamax = parseISO(data[0].FechaFinal);
  
      if (fechaActual >= fechamin && fechaActual <= fechamax) {
      setPeriodoAcademicoActualPAC("3PAC");
      }
  } catch (error) {
      console.error("Error al obtener las fechas mínima y máxima:", error);
  }
  };
  obtenerFechasMinMaxIPAC();
  obtenerFechasMinMaxIIPAC();
  obtenerFechasMinMaxIIIPAC();
  
  useEffect(() => {
    if (periodoAcademicoActual && añoActual) {
      FechasMatricula();
    }
    console.log(periodoAcademicoActual);
}, [periodoAcademicoActual, añoActual]);

const FechasMatricula = async ()=> {
    try {
        const URL = "http://localhost:5000/ObtenerFechasMatricula";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Sistema: Sistema,
                PeriodoAcademico: periodoAcademicoActual,
            }),
            });
            const data = await response.json();
            setDatasFechas(data);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
};

  
const matricularPorIndice = async () => {

  if(!indiceGlobal){
    if(day==DataFechas[0].IntermediateDay){
      window.location.href = "/src/html/Matricula.html";
      }else{
        alert("Su fecha de matricula es: "+DataFechas[0].IntermediateDay+" de "+ numeroAMes(DataFechas[0].IntermediateMonth)+" del "+DataFechas[0].IntermediateYear+"\n\n Comienza a las 9:00 am y termina a las 11:59 pm");
    }
  }else{
    switch (true) {
      case indiceGlobal >= 90:
        if(day==DataFechas[0].IntermediateDay){
          window.location.href = "/src/html/Matricula.html";
          }else{
            alert("Su fecha de matricula es: "+DataFechas[0].IntermediateDay+" de "+ numeroAMes(DataFechas[0].IntermediateMonth)+" del "+DataFechas[0].IntermediateYear+"\n\n Comienza a las 9:00 am y termina a las 11:59 pm");
        }
        break;
      case indiceGlobal >= 80:
        if(day==DataFechas[1].IntermediateDay){
          window.location.href = "/src/html/Matricula.html";
          }else{
            alert("Su fecha de matricula es: "+DataFechas[1].IntermediateDay+" de "+ numeroAMes(DataFechas[1].IntermediateMonth)+" del "+DataFechas[1].IntermediateYear+"\n\n Comienza a las 9:00 am y termina a las 11:59 pm");
        }
        break;
      case indiceGlobal >= 65:
        if(day==DataFechas[2].IntermediateDay){
          window.location.href = "/src/html/Matricula.html";
          }else{
            alert("Su fecha de matricula es: "+DataFechas[2].IntermediateDay+" de "+ numeroAMes(DataFechas[2].IntermediateMonth)+" del "+DataFechas[2].IntermediateYear+"\n\n Comienza a las 9:00 am y termina a las 11:59 pm");
        }
        break;
      case indiceGlobal < 65:
        if(day==DataFechas[3].IntermediateDay){
          window.location.href = "/src/html/Matricula.html";
          }else{
            alert("Su fecha de matricula es: "+DataFechas[3].IntermediateDay+" de "+ numeroAMes(DataFechas[3].IntermediateMonth)+" del "+DataFechas[3].IntermediateYear+"\n\n Comienza a las 9:00 am y termina a las 11:59 pm");
        }
        break;
      default:
        alert("Proceso de matricula no disponible");
        break;
    }
  }

  function numeroAMes(numero) {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    if (numero >= 1 && numero <= 12) {
      return meses[numero - 1];
    } else {
      return "Mes inválido";
    }
  }

};

  return (
    <section className="bg-white md:mt-5">
      <h1 className="text-2xl  text-center font-bold pt-2 text-gray-900 sm:text-3xl">
        Bienvenido {nombreUsuario} {apellidoUsuario}
      </h1>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">Matricula</strong>
              </p>
              <div className="row">
                <h1>
                  <FcOvertime className="mx-auto m-2" />
                </h1>
              </div>
              <div className="grid grid-cols-1">
                  <a onClick={matricularPorIndice}
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    style={{ cursor: 'pointer' }}
                  >
                    <span className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ backgroundColor: '#145eb9' }}
                    ></span>

                    <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75" >
                      Ir
                    </span>
                  </a>
              </div>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className=" rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl ">Solicitudes</strong>
              </p>
              <div className="row">
                <h1>
                  <FcOpenedFolder className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/Solicitudes.html"
                  >
                    <span className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ backgroundColor: '#145eb9' }}
                    ></span>

                    <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75" >
                      Ir
                    </span>
                  </a>
                </a>
              </div>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">Chat</strong>
              </p>
              <div className="row">
                <h1>
                  <FcConferenceCall className="mx-auto m-2" />
                </h1>
              </div>
              <div className="grid grid-cols-1">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/chat.html"
                  >
                    <span className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ backgroundColor: '#145eb9' }}
                    ></span>

                    <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75" >
                      Ir
                    </span>
                  </a>
              </div>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Historial Académico
                </strong>
              </p>
              <div className="row">
                <h1>
                  <FcBarChart className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/Historial.html"
                  >
                    <span className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ backgroundColor: '#145eb9' }}
                    ></span>

                    <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75" >
                      IR
                    </span>
                  </a>
                </a>
              </div>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Estado de Cuenta
                </strong>
              </p>
              <div className="row">
                <h1>
                  <FcTimeline className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1"
              style={{ cursor: 'pointer' }}>
                <EstadoCuenta></EstadoCuenta>
              </div>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">Forma 03</strong>
              </p>
              <div className="row"> 
                <h1><FcOk className="mx-auto m-2"/></h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/Forma03.html"
                  >
                    <span className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ backgroundColor: '#145eb9' }}
                    ></span>

                    <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75" >
                      IR 
                    </span>
                  </a>
                </a>
              </div>
            </div>
          </article>

          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Notas periodo actual
                </strong>
              </p>
              <div className="row">
                <h1>
                  <FcInspection className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/NotasActuales.html"
                  >
                    <span className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ backgroundColor: '#145eb9' }}
                    ></span>

                    <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75" >
                      Ir
                    </span>
                  </a>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default MenuEstudiante;
