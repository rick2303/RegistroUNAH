import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components';

const EstudiantesFiltradosMatriculados = () => {
    const [users, setUsers] = useState([]);
    const [carreraUsuario, setCarreraUsuario] = useState("");
    const [CentroRegional, setCentroRegional] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const userData = JSON.parse(storedData);
            const Carrera = userData.data.Carrera;
            const CentroRegional = userData.data.CentroRegional;
            setCarreraUsuario(Carrera);
            setCentroRegional(CentroRegional);
        }
    }, []);

    useEffect(() => {
        showData();
    }, [carreraUsuario]);

    const showData = async () => {
        let URL = 'http://localhost:5000/estudiantesMatriculadosDepto';
        let dataEnviada = {
            "Carrera": carreraUsuario,
            "CentroRegional": CentroRegional
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEnviada),
        };

        const response = await fetch(URL, options);
        const data = await response.json();
        console.log(data);
        setUsers(data);
    };
    //configuramos las columnas para DataTable

    const columnas = [
        {
        name:'NÚMERO DE CUENTA',
        selector : row => row.NumCuenta
        },
        {
        name:'NOMBRE',
        selector : row => row.Nombre.toUpperCase()
        },
        {
        name:'APELLIDO',
        selector : row => row.Apellido.toUpperCase()
        },
        {
        name:'CARRERA',
        selector : row => row.Carrera.toUpperCase()
        },
        {
        name:'CORREO INSTITUCIONAL',
        selector : row => row.CorreoInstitucional.toLowerCase()
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
            <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
                Listado de estudiantes Matriculados en {carreraUsuario}
            </h1>
            <DataTable columns={columnas} data={users} pagination />
        </div>
    );
    

    
}


export default EstudiantesFiltradosMatriculados;