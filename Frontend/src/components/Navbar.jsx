import React from "react";
import { FcMenu } from "react-icons/fc";
import { BsArrowReturnLeft } from "react-icons/bs";
import {
  MobileNav,
  Typography,
  
} from "@material-tailwind/react";
import "bootstrap/dist/css/bootstrap.min.css"
export default function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []); 
  const currentPath = window.location.pathname; // Obtener la ruta actual

  let redirectTo;
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  const subrol = userData.data.Subrol;
  
  if (currentPath === "/src/html/Jefatura.html" ) {
    redirectTo = "../html/Jefatura_menu.html";
  }
 
  if (currentPath === "/src/html/Coordinacion.html" ){
    redirectTo="../html/Coordinacion_menu.html"
  }

  if(currentPath === "/src/html/EstuFiltradosMatriculados.html"){
    redirectTo="../html/Jefatura.html"
  }

  if((currentPath === "/src/html/EstudiantesMatriculados.html" && subrol==="COORDINADOR")||(currentPath==="/src/html/HistorialAdmin.html" && subrol==="COORDINADOR")){
    redirectTo="../html/Coordinacion.html"
  }

  if((currentPath === "/src/html/EstudiantesMatriculados.html" && subrol==="JEFE DEPARTAMENTO")||(currentPath==="/src/html/HistorialAdmin.html" && subrol==="JEFE DEPARTAMENTO")){
    redirectTo="../html/Jefatura.html"
  }


  console.log(currentPath)
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue"
        className="p-1 font-normal "
      >
        <a href={redirectTo} className="flex items-center">
          <h1 className="text-5xl"><BsArrowReturnLeft/></h1>
        </a>
      </Typography>
      
        
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <img className="rounded-full h-20 w-20" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="user avatar" />

      </Typography>
    </ul>
  );

  return (
    <>
      <header
        className="border-b  backdrop-blur min-w-full top
        bg-gradient-to-r from-blue-900 via-yellow-300 to-yellow-400"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-5 cursor-pointer py-1.5 font-medium"
          >
            <img className="ml-3 h-30 w-40" src="\logounah.png"></img>
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
