import '../App.css'
import Navbar from "../components/NavbarEstudiante";
import MenuPagoReposicion from "../components/PagoReposicion.jsx";
import ModalCargarPDFCancelaciones from "../components/modalCargarPDFCancelaciones";

function AppPagoReposicion() {

  return (
    <>
      <Navbar /> 
      <MenuPagoReposicion/> 
      <ModalCargarPDFCancelaciones/>
    </>
  )
}

export default AppPagoReposicion;