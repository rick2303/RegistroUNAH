//import React from "react";
import { FcUpload } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from "react";


function MenuDocente() { 
    
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [foto, setFoto] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const nombre = userData.data.Nombre; 
      const fotoPerfil = userData.perfil.Imagen1
      setNombreUsuario(nombre);
      setFoto(fotoPerfil);
    }
  }, []);
  return (
    <section className="bg-white md:mt-5">
      <h1 className="text-2xl  text-center font-bold pt-2 text-gray-900 sm:text-3xl">
       Bienvenido {nombreUsuario} 
      </h1>
      
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-yellow-400 to-yellow-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-14 !pt-15 sm:p-6 row">
              <p className="featured-block-text text-center">
                <strong className="text-xl text-center">Cargar Notas</strong>
              </p>
              <div className="row"> 
                <h1><FcUpload className="mx-auto m-2"/></h1>
              </div>
  
              <div className="grid grid-cols-1" >
                <a  data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/download"
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
                <strong className="text-xl text-center">Secciones</strong>
              </p>
              <div className="row"> 
                <h1><FcCalendar className="mx-auto m-2"/></h1>
              </div>
  
              <div className="grid grid-cols-1">
                <a href="#">
                  <a
                    className=" grid grid-cols-1 group relative focus:outline-none focus:ring"
                    href="/download"
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

export default MenuDocente;
