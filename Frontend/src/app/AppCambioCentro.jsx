import '../App.css'
import Navbar from "../components/NavbarEstudiante";
import MenuCambioCentro from "../components/CambioCentro.jsx";
import ModalCargarPDFCancelaciones from "../components/modalCargarPDFCancelaciones";

function AppCambioCentro() {

  return (
    <>
      <Navbar /> 
      <MenuCambioCentro/> 
      <ModalCargarPDFCancelaciones/>
    </>
  )
}

export default AppCambioCentro;