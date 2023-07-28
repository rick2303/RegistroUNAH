
import '../App.css'
import Navbar from "../components/Navbar.jsx";
import MenuAdmin from "../components/MenuAdmin";
import ModalCargar from '../components/ModalCargar';


function AppAdministracion() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Navbar /> 
      <MenuAdmin /> 
      <ModalCargar /> 

    
    </>
  )
}

export default AppAdministracion
