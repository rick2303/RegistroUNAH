//import React from "react";
import { FcAnswers, FcUpload } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ModalDocentes from "./ModalDocentes";

function MenuAdmin() {
  const simularpago = async () => {
    try {
      const URL = "http://localhost:5000/simularPago";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response.ok){
        alert("Pagos realizados")
      }
    } catch (error) {
      console.error("Error al hacer pago", error);
    }
  };

  return (
    <section className="bg-white md:mt-5">
      <h1 className="text-2xl  text-center font-bold pt-2 text-gray-900 sm:text-3xl">
        Administración
      </h1>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Cargar estudiantes
                </strong>
              </p>
              <div className="mx-auto row">
                <h1>
                  <FcUpload className="mx-auto m-2" />
                </h1>
              </div>
              <div className="grid grid-cols-1">
                <a data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <a
                    className=" rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/download"
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
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Registrar Docentes
                </strong>
              </p>
              <div className="mx-auto  row">
                <h1>
                  <FcBusinessman className="mx-auto m-2" />
                </h1>
              </div>
              <ModalDocentes></ModalDocentes>
            </div>
          </article>
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  {" "}
                  Listado de docentes{" "}
                </strong>
              </p>
              <div className="mx-auto row">
                <h1>
                  <FcTodoList className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/ListadoDocentes.html"
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
          
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  {" "}
                  Planificación Academica{" "}
                </strong>
              </p>
              <div className="mx-auto row">
                <h1>
                  <FcCalendar className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="../html/FechaPeriodo.html">
                  <a
                    className=" rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/FechaPeriodo.html"
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
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  Gestión Matricula
                </strong>
              </p>
              <div className="mx-auto  row">
                <h1>
                  <FcCalendar className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className="rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/FechaMatricula.html"
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
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center"> Cancelaciones </strong>
              </p>
              <div className="mx-auto row">
                <h1>
                  <FcCalendar className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/FechaCancelaciones.html"
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
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">
                  {" "}
                  Ingreso de notas{" "}
                </strong>
              </p>
              <div className="mx-auto row">
                <h1>
                  <FcCalendar className="mx-auto m-2" />
                </h1>
              </div>

              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/src/html/FechaNotas.html"
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
          <article
      className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-blue-400 to-blue-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
    >
      <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
        <p className="featured-block-text text-center">
          <strong className="text-xl text-center">Simular Pagos</strong>
        </p>
        <div className="mx-auto row">
          <h1>
            <FcAnswers className="mx-auto m-2" />
          </h1>
        </div>
        <div
          className="grid grid-cols-1"
          style={{ cursor: "pointer" }}
        >
          <a
            className="rounded grid grid-cols-1 group relative focus:outline-none focus:ring"
            onClick={simularpago}
          >
            <span
              className="rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
              style={{ backgroundColor: "#145eb9" }}
            ></span>
            <span className="rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
              Ir
            </span>
          </a>
        </div>
      </div>
    </article>
        </div>
      </div>
    </section>
  );
}

export default MenuAdmin;
