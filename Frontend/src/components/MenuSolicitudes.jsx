import React, { useEffect, useState } from "react";
import {
  FcReadingEbook,
  FcInspection,
  FcLeave,
  FcNeutralTrading,
} from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO, set } from "date-fns";

function MenuSolicitudes() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [restriccionCambio, setrestriccionCambio] = useState("");
  const [NumCuenta, setNumCuenta] = useState("");
  const [Sistema, setSistema] = useState("");
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
      setSistema(userData.data.Sistema);
      setNumCuenta(userData.data.NumCuenta)
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
        const URL = "http://localhost:5000/ObtenerFechasCancelaciones";
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

        try {
          const URL = "http://localhost:5000/RestriccionCambioCentro";
          const response = await fetch(URL, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                NumCuenta: NumCuenta,
              }),
              });
              const data = await response.json();
              setrestriccionCambio(data[0].clasesQueLleva);
              console.log(data[0].clasesQueLleva);
  
  
            
          } catch (error) {
              console.error("Error al obtener los datos:", error);
          }
      
};
  
const restriccionCambioCentro = async () => {

  if(restriccionCambio > 0){
      alert("TIENE CLASES MATRICULADAS EN EL PERÍODO ACTUAL, PARA SOLICITAR CAMBIO DE CARRERA TIENE QUE CANCELAR LAS CLASES MATRICULADAS");
  }else{
    window.location.href = "/src/html/CambioCentro.html";
}
}

const activarCancelacionExcep = async () => {

  const ultimoValor = DataFechas[DataFechas.length - 1];


    if(day >= DataFechas[0].IntermediateDay ){
      if (day <= ultimoValor.IntermediateDay) {
      window.location.href = "/src/html/CancelacionExepc.html";
      }else{
        alert("EL PERÍODO DE CANCELACIÓN EXCEPCIONAL NO ESTA ACTIVO");
    }
  }else{
    alert("EL PERÍODO DE CANCELACIÓN EXCEPCIONAL NO ESTA ACTIVO");
}



};
  return (
    <section className="bg-white md:mt-5">
      <h1 className="text-2xl  text-center font-bold pt-2 text-gray-900 sm:text-3xl">
        Solicitudes
      </h1>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
        <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className=" rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl ">Cambio de Carrera</strong>
              </p>
              <div className="row">
                <h1>
                  <FcReadingEbook className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/CambiodeCarrera.html"
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
            <div className=" rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl ">Cancelación Excepcional</strong>
              </p>
              <div className="row">
                <h1>
                  <FcInspection className="mx-auto m-2" />
                </h1>
              </div>
              <div className="grid grid-cols-1">
                  <a onClick={activarCancelacionExcep}
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
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Cambio de centro
                </strong>
              </p>
              <div className="row">
                <h1>
                  <FcNeutralTrading className="mx-auto m-2" />
                </h1>
              </div>
              <div className="grid grid-cols-1">
                  <a onClick={restriccionCambioCentro}
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
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Pago de reposición
                </strong>
              </p>
              <div className="row">
                <h1>
                  <FcLeave className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/PagoReposicion.html"
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
        </div>
      </div>
    </section>
  );
}

export default MenuSolicitudes;
