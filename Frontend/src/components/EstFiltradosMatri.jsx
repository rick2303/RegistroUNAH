import "bootstrap/dist/css/bootstrap.min.css"
import React,{useState,useEffect} from 'react';


function EspacioBotonFiltradoDepartamento() {
    return (
        <section className="bg-white md:mt-5">
            <h1 className="text-2xl  text-center font-bold pt-2 text-gray-900 sm:text-3xl">
            Listado de estudiantes Matriculados en la Universidad Nacional Autónoma de Honduras
            </h1>

            <br></br>
            <br></br>
            <div class="d-flex align-items-center">
            <p className="text-left font-normal pt-2 pb-5 pr-3 align-self-center text-gray-900 sm:text-2xl">Para poder ver los estudiantes matriculados de su departamento dar click --</p>

            <a href="../html/EstuFiltradosMatriculados.html" className="text-center font-bold pt-2 pb-5 pr-3 align-self-center text-gray-900 sm:text-2xl">Aqui</a>
            </div>

        </section>
    );
}

export default EspacioBotonFiltradoDepartamento;