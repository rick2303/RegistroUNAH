
import "bootstrap/dist/css/bootstrap.min.css"
import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components'

const MenuHistorialAdmin = () => {


    const [users,setUsers] = useState([])
    

    //funcion para  mostrar los datos con fetch
    const URL = 'Frontend\public\listado.json'
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
        name:'ID',
        selector : row => row.id
      },
      {
        name:'CODIGO',
        selector : row => row.asignatura
      },
      {
        name:'ASIGNATURA',
        selector : row => row.asignatura
      },
      {
        name:'UV',
        selector : row => row.uv
      },
      {
        name:'SECCION',
        selector : row => row.seccion
      },
      {
        name:'Año',
        selector : row => row.año
      },
      {
        name:'PERIODO',
        selector :row => row.periodo
      },
      {
        name:'CALIFICACION',
        selector :row => row.calificacion
      },
      {
        name:'OBS',
        selector : row => row.obs
      },
      {
        name:'IdDocente',
        selector : row => row.IdDocente
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


export default MenuHistorialAdmin;