//import React from "react";
import { FcUpload } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

function MenuDocente() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [sistema, setSistema] = useState("");
  const [foto, setFoto] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const nombre = userData.data.Nombre + " " + userData.data.Apellido;
      const sistema = userData.data.Sistema;
      setSistema(sistema);
      // const fotoPerfil = userData.perfil.Imagen1
      setNombreUsuario(nombre);
      // setFoto(fotoPerfil);
    }
  }, []);

  // Function to fetch data based on the input value
  const fechaMatricula = () => {
    fetch("http://localhost:5000/accesoIngresoNotas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Sistema: sistema }), // Send input value as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Imprime el array recibido en la consola
        window.location.href = '/src/html/CargarNotas.html';
      /*   // Convertir las fechas de cadena a objetos Date
        const fechaInicio = new Date(data.FechaInicio);
        const fechaFinal = new Date(data.FechaFinal);

        // Obtener la fecha y hora actual
        const fechaActual = new Date();

        // Comparar las fechas
        if (fechaInicio > fechaActual) {
          alert("La fecha de inicio es mayor a la fecha actual.");
        } else if (fechaFinal < fechaActual) {
          alert("La fecha final ya ha pasado.");
        } */
      })
      .catch((error) => {
        console.error("Ingreso de notas inactivo");
        alert("Proceso de ingreso de notas inactivo");
        
      });
  };
 
  return (
    <section className="bg-white md:mt-5">
      <h1 className="text-2xl  text-center font-bold pt-2 text-gray-900 sm:text-3xl">
        Bienvenido {nombreUsuario}
      </h1>

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">Cargar Notas</strong>
              </p>
              <div className="row">
                <h1>
                  <FcUpload className="mx-auto m-2" />
                </h1>
              </div>

              <div  onClick={ fechaMatricula} className="grid grid-cols-1 cursor-pointer">
                <a
                  className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                 /*  href="/src/html/CargarNotas.html" */
                >
                  <span
                    className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ backgroundColor: "#145eb9" }}
                  ></span>

                  <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
                    Ir
                  </span>
                </a>
              </div>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">Secciones</strong>
              </p>
              <div className="row">
                <h1>
                  <FcCalendar className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/SeccionesAsignadas.html"
                  >
                    <span
                      className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      style={{ backgroundColor: "#145eb9" }}
                    ></span>

                    <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
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

export default MenuDocente;
