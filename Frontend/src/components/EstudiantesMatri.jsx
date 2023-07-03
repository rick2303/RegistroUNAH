
import "bootstrap/dist/css/bootstrap.min.css"
import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components'

const EstudiantesMatriculadosMain = () => {


    const [users,setUsers] = useState([])
    

    //funcion para  mostrar los datos con fetch
    const URL = 'http://localhost:5000/estudiantesmatriculados'
    const showData = async () => {
      const response = await fetch (URL) 
      const data = await response.json()
      console.log(data) 
      setUsers(data)

    } 

    useEffect ( ()=>{
      showData()
    }, [] )

    //configuramos las columnas para DataTable

    const columnas = [
      {
        name:'NÚMERO DE CUENTA',
        selector : row => row.NumCuenta
      },
      {
        name:'NOMBRE',
        selector : row => row.Nombre
      },
      {
        name:'APELLIDO',
        selector : row => row.Apellido
      },
      {
        name:'CARRERA',
        selector : row => row.Carrera
      },
      {
        name:'CORREO INSTITUCIONAL',
        selector : row => row.CorreoInstitucional
      },
      {
        name:'ÍNDICE GLOBAL',
        selector : row => row.IndiceGlobal
      },
      {
        name:'ÍNDICE DEL PERIODO',
        selector :row => row.IndicePeriodo
      },

      ]
      
    //Mostramos la data en DataTable

      return (

      <div className="App">
      <DataTable
        columns={columnas}
        data={users}
        pagination
        ></DataTable>
      </div>   )
      

    
  }


export default EstudiantesMatriculadosMain;