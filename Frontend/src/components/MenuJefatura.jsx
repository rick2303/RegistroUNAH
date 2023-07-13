//import React from "react";
import React, { useEffect, useState } from "react";
import ModalSeccioness from "./Modal_Secciones";
import {
  FcAddRow,
  FcSearch,
  FcCheckmark,
  FcAddColumn,
  FcDiploma1,
  FcOk,
} from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css";

function MenuJefatura() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const nombre = userData.data.Nombre; // Asegúrate de utilizar la clave correcta para el nombre del usuario
      const apellido = userData.data.Apellido;
      setNombreUsuario(nombre);
      setApellidoUsuario(apellido);
    }
  }, []);
  return (
    <section className="bg-white md:mt-5">
      <h1 className="text-2xl  text-center font-bold pt-2 text-gray-900 sm:text-3xl">
        Bienvenido {nombreUsuario} {apellidoUsuario}
      </h1>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">

        <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-yellow-400 to-yellow-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Secciones
                </strong>
              </p>
              <div className="row">
                <h1>
                  <FcAddRow className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/Secciones.html"
                  >
                    <span className=" grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span className="relative text-center inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                      Ir
                    </span>
                  </a>
                </a>
              </div>
            </div>
          </article>
          
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-yellow-400 to-yellow-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Estudiantes Matriculados
                </strong>
              </p>
              <div className="row">
                <h1>
                  <FcCheckmark className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/EstuFiltradosMatriculados.html"
                  >
                    <span className=" grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span className="relative text-center inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                      Ir
                    </span>
                  </a>
                </a>
              </div>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-yellow-400 to-yellow-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  {" "}
                  Historiales Académicos{" "}
                </strong>
              </p>
              <div className="row">
                <h1>
                  <FcDiploma1 className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/HistorialAdmin.html"
                  >
                    <span className=" grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span className="relative text-center inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                      Ir
                    </span>
                  </a>
                </a>
              </div>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-yellow-400 to-yellow-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center"> Formas 03</strong>
              </p>
              <div className="row">
                <h1>
                  <FcOk className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/Forma03Admin.html"
                  >
                    <span className=" grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span className="relative text-center inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
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

export default MenuJefatura;
