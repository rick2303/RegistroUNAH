import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components';
import styled from 'styled-components';

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
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

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#145eb9',
                color: 'white',
                borderBottom: '1px solid #c6c6c6', 
            },
            },
            rows: {
            style: {
                border: '1px solid #c6c6c6', 
                textAlign: 'center',
            },
            },
        };
        
        const TableHeaderCell = styled.div`
        margin: auto;
        `;
    const columnas = [
        {
        name:<TableHeaderCell>NÚMERO DE CUENTA</TableHeaderCell>,
        selector : row => row.NumCuenta,
        cell: row => <TableHeaderCell>{row.NumCuenta}</TableHeaderCell>
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
        selector : row => row.Carrera.toUpperCase(),

        with: "18%"
        },
        {
        name:'CORREO INSTITUCIONAL',
        selector : row => row.CorreoInstitucional.toLowerCase()
        },
        {
        name:<TableHeaderCell>ÍNDICE GLOBAL</TableHeaderCell>,
        selector : row => row.IndiceGlobal,
        cell: row => <TableHeaderCell>{row.IndiceGlobal}</TableHeaderCell>
        },
        {
        name:<TableHeaderCell>ÍNDICE DEL PERIODO</TableHeaderCell>,
        selector :row => row.IndicePeriodo,
        cell: row => <TableHeaderCell>{row.IndicePeriodo}</TableHeaderCell>
},

]
    //Mostramos la data en DataTable
    const NoDataComponent = () => {
        return <div>No hay registros para mostrar</div>;
        };
    return (
        <div className="App">
            <div className="container ">
            <div className="row">
                <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
                    Listado de estudiantes Matriculados en {carreraUsuario}
                </h1>
                <DataTable columns={columnas} data={users} pagination paginationComponentOptions={paginationComponentOptions} 
                customStyles={customStyles}
                noDataComponent={<NoDataComponent />}/>
            </div>
            </div>
        </div>
    );
    

    
}


export default EstudiantesFiltradosMatriculados;