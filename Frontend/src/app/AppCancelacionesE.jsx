import '../App.css'
import Navbar from "../components/NavbarEstudiante";
import MenuCancelaciones from "../components/MenuCancel.jsx";
import ModalCargarPDFCancelaciones from "../components/modalCargarPDFCancelaciones";

function AppCancelaciones() {

  return (
    <>
      <Navbar /> 
      <MenuCancelaciones/> 
      <ModalCargarPDFCancelaciones/>
    </>
  )
}

export default AppCancelaciones;