import React, {useEffect, useState} from "react";
import { FcMenu } from "react-icons/fc";
import { TiArrowBackOutline  } from "react-icons/ti";
import {BiLogOut} from "react-icons/bi";
import {
  MobileNav,
  Typography,
  
} from "@material-tailwind/react";
import "bootstrap/dist/css/bootstrap.min.css"
export default function NavbarDocente() {
  const [imagenUsuario, setImagenUsuario] = useState("");
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  const subrol = userData.data.Subrol;

  useEffect(() => {

    if (storedData) {
      const userData = JSON.parse(storedData);
      if(!userData.perfil || !userData.perfil.Imagen1){
        const alternativaImagen = '1688323336413-804346209-64572.png'
        setImagenUsuario(alternativaImagen);
        
      }else{
        const alternativaImagen = userData.perfil.Imagen1; 
        setImagenUsuario(alternativaImagen);
      }
      
    }
    
  }, []);
  const [openNav, setOpenNav] = React.useState(false);

  //const [foto, setFoto] = useState("");

  // useEffect(() => {
  //   const storedData = localStorage.getItem("userData");
  //   if (storedData) {
  //     const userData = JSON.parse(storedData);
  //     const fotoPerfil = userData.perfil.Imagen1
  //     console.log(fotoPerfil)
  //     setFoto(fotoPerfil);
  //   }
  // }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []); 
  const currentPath = window.location.pathname; // Obtener la ruta actual

  let redirectTo;
  
  if (currentPath === "/src/html/Docente.html") {
    redirectTo = "../";
  } else {
    redirectTo = "../html/Docente.html";
  }


  if(currentPath === "/src/html/Docente.html" && subrol=="COORDINADOR"){
    redirectTo="../html/Coordinacion_menu.html"
  }

  if(currentPath === "/src/html/Docente.html" && subrol=="JEFE DEPARTAMENTO"){
    redirectTo="../html/Jefatura_menu.html"
  }
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue"
        className="p-1 font-normal "
        title="Regresar"
      >
        {subrol !== "DOCENTE" &&
 (
        <a href={redirectTo} style={{ color: "white" }} className="flex items-center">
          <h1 className="text-5xl cursor-pointer">
            <TiArrowBackOutline />
          </h1>
        </a>
      )}
    
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue"
        className="p-1 font-normal "
        title="Salir"
      >
        <a href="../../index.html" style={{ color: 'white' }} className="flex items-center">
          <h1 className="text-5xl"><BiLogOut/></h1>
        </a>
      </Typography>
        
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
      
        <a href="../html/Perfil_docente.html">
        <img className="rounded-full h-20 w-20" src={`../img/uploads/${imagenUsuario}`}  alt = "Perfil"/>
        </a>
     
      </Typography>
    </ul>
  );

  return (
    <>
      <header
        className="border-b  backdrop-blur min-w-full top"
        style={{ backgroundColor: '#145eb9' }}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="http://127.0.0.1:5173/src/html/Docente.html"
            className="mr-5 cursor-pointer py-1.5 font-medium"
          >
            <img className="ml-3 h-30 w-60" src="\LogoBlancoUNAH.png"></img>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            
            
            <button
              variant="text"
              className="mx-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                
                <h2><FcMenu/></h2>
              
              )}
            </button>
          </div>
        </div>
        
        
        <MobileNav open={openNav}>
          {navList}
          
        </MobileNav>
      </header>
      
    </>
  );
}
