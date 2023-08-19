import { format, parseISO, set } from "date-fns";
import React, { useState, useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";

const MenuEstadisticas = () => {
    const [matriculados, setMatriculados] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [espera, setEspera] = useState([]);
    const [docente, setDocente] = useState([]);
    const [carreraUsuario, setCarreraUsuario] = useState("");
    const [CentroRegional, setCentroRegional] = useState("");
    const [periodoAcademicoActual, setPeriodoAcademicoActualPAC] = useState("");
    const [graficacion, setGrafica] = useState([])
    const [chartInstance, setChartInstance] = useState(null);
    const fechaActual = new Date();
    const chartRef = useRef(null);

    const obtenerFechasMinMaxIPAC = async () => {
        try {
            const response = await fetch(
            "http://localhost:5000/enviarPlanificacionIPAC"
            );
            const data = await response.json();
            const fechamin = parseISO(data[0].FechaInicio);
            const fechamax = parseISO(data[0].FechaFinal);
        
            if (fechaActual >= fechamin && fechaActual <= fechamax) {
            setPeriodoAcademicoActualPAC("1PAC");
            }
        } catch (error) {
            console.error("Error al obtener las fechas mínima y máxima:", error);
        }
        };
        
        const obtenerFechasMinMaxIIPAC = async () => {
        try {
            const response = await fetch(
            "http://localhost:5000/enviarPlanificacionIIPAC"
            );
            const data = await response.json();
            const fechamin = parseISO(data[0].FechaInicio);
            const fechamax = parseISO(data[0].FechaFinal);
        
            if (fechaActual >= fechamin && fechaActual <= fechamax) {
            setPeriodoAcademicoActualPAC("2PAC");
            }
        } catch (error) {
            console.error("Error al obtener las fechas mínima y máxima:", error);
        }
        };
        
        const obtenerFechasMinMaxIIIPAC = async () => {
        try {
            const response = await fetch(
            "http://localhost:5000/enviarPlanificacionIIIPAC"
            );
            const data = await response.json();
            const fechamin = parseISO(data[0].FechaInicio);
            const fechamax = parseISO(data[0].FechaFinal);
        
            if (fechaActual >= fechamin && fechaActual <= fechamax) {
            setPeriodoAcademicoActualPAC("3PAC");
            }
        } catch (error) {
            console.error("Error al obtener las fechas mínima y máxima:", error);
        }
        };


    const showData = async () => {
        let URL1 = 'http://localhost:5000/obtenerNumeroMatriculados';
        let dataEnviada1 = {
            "carrera": carreraUsuario,
            "centroRegional": CentroRegional,
            "periodo": periodoAcademicoActual
        };
        let options1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEnviada1),
        };

        const response1 = await fetch(URL1, options1);
        const data1 = await response1.json();
        setMatriculados(data1);

        let URL2 = 'http://localhost:5000/obtenerNumeroEspera';
        let dataEnviada2 = {
            "carrera": carreraUsuario,
            "centroRegional": CentroRegional,
            "periodo": periodoAcademicoActual
        };
        let options2 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEnviada2),
        };

        const response2 = await fetch(URL2, options2);
        const data21 = await response2.json();
        setEspera(data21);

        let URL3 = 'http://localhost:5000/obtenerNumeroSecciones';
        let dataEnviada3 = {
            "carrera": carreraUsuario,
            "centroRegional": CentroRegional,
            "periodo": periodoAcademicoActual
        };
        let options3 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEnviada3),
        };

        const response3 = await fetch(URL3, options3);
        const data3 = await response3.json();
        setSecciones(data3);

        let URL4 = 'http://localhost:5000/obtenerNumeroDocentes';
        let dataEnviada4 = {
            "carrera": carreraUsuario,
            "centroRegional": CentroRegional,
        };
        let options4 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEnviada4),
        };

        const response4 = await fetch(URL4, options4);
        const data4 = await response4.json();
        setDocente(data4)

        let URL5 = 'http://localhost:5000/obtenerGraficaClases';
        let dataEnviada5 = {
            "carrera": carreraUsuario,
            "centroRegional": CentroRegional,
            "periodo": periodoAcademicoActual
        };
        let options5 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEnviada5),
        };

        const response5 = await fetch(URL5, options5);
        const data5 = await response5.json();
        grafica(data5)
        setGrafica(data5[0])
    };


    const fetchDataAndRenderChart = async () => {

        await obtenerFechasMinMaxIPAC();
        await obtenerFechasMinMaxIIPAC();
        await obtenerFechasMinMaxIIIPAC();
        await showData();
    };


    useEffect(() => {
        fetchDataAndRenderChart();
    }, [carreraUsuario, periodoAcademicoActual]);


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

    const grafica = (data5) =>  {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById("myChart").getContext("2d");

        const dataLabels = data5.map(item => item.Asignatura);
        console.log(dataLabels)
        const labels = dataLabels;

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Estudiantes en espera',
                    data: data5.map(item => item.TotalListaEspera), // Aquí debes proporcionar tus datos
                    borderColor:  "#1baec8",
                    backgroundColor: "rgba(27, 174, 200, 0.5)", 
                    borderWidth: 2,
                    borderRadius: 10, 
                    borderSkipped: false,
                },
                {
                    label: 'Cupos libres',
                    data: data5.map(item => item.CuposTotales), // Aquí debes proporcionar tus datos
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.5)",
                    borderWidth: 2,
                    borderRadius: 10,
                    borderSkipped: false,
                }
            ]
        };

        const newChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Informe de clases'
                    }
                },
                scales: {
                    x: {
                        stacked: false, 
                    },
                    y: {
                        stacked: false, 
                        suggestedMin: 0,
                        suggestedMax: 100,
                        stepSize: 50,
                    }
                }
            }
        });

        chartRef.current = newChart;
    }





    return (
        <div className="App" style={{ backgroundColor: "#e4eefd" }}>
                <h1 className="text-2xl text-center font-bold pt-4 pb-4 text-gray-900 sm:text-3xl">
                INFORME DE MATRÍCULA - JEFE DEL DEPARTAMENTO
                </h1>

        <div style={{ display: "flex", justifyContent: "center", paddingBottom:"25px"}}>

            <div style={{ backgroundColor: "rgba(20, 94, 185, 0.2)", borderRadius: "20px", margin: "0px", display: "flex" }}>
                <div style={{ width: "200px", height: "130px", paddingTop: "15px", borderRadius: "20px", margin: "15px", backgroundColor: "#ffff" }}>
                    <h1 style={{ fontSize: "60px", textAlign: "center" }}><b>{docente.NumeroDocentes}</b></h1>
                    <p style={{ fontSize: "15px", textAlign: "center" }}>Docentes Activos</p>
                </div>
                <div style={{ width: "200px", height: "130px", paddingTop: "15px", borderRadius: "20px", margin: "15px", backgroundColor: "#1baec8" }}>
                    <h1 style={{ fontSize: "60px", textAlign: "center" }}><b>{secciones.NumeroSecciones}</b></h1>
                    <p style={{ fontSize: "15px", textAlign: "center" }}>Secciones creadas</p>
                </div>
                <div style={{ width: "200px", height: "130px", paddingTop: "15px", borderRadius: "20px", margin: "15px", backgroundColor: "#ffff" }}>
                    <h1 style={{ fontSize: "60px", textAlign: "center" }}><b>{espera.NumeroESPERA}</b></h1>
                    <p style={{ fontSize: "15px", textAlign: "center" }}>Estudiantes en lista <br></br> de espera</p>
                </div>
                <div style={{ width: "200px", height: "130px", paddingTop: "15px", borderRadius: "20px", margin: "15px", backgroundColor: "#1baec8" }}>
                    <h1 style={{ fontSize: "60px", textAlign: "center" }}><b>{matriculados.NumeroMatriculados}</b></h1>
                    <p style={{ fontSize: "15px", textAlign: "center" }}>Estudiantes matriculados <br></br> este período</p>
                </div>
            </div>
        </div>


        <div style={{ display: "flex", justifyContent: "center", height: "70vh", paddingBottom: "20px" }}>
            <div style={{ width: "95%", borderRadius: "20px", backgroundColor: "rgba(20, 94, 185, 0.2)", paddingTop:"10px"}}>
                <p style={{ fontSize: "25px", textAlign: "center", marginTop:"15px"}}><b>Gráfica: estudiantes en lista de espera y cupos disponibles</b></p>
                <canvas id="myChart" style={{ width: "20%", height: "15%", marginLeft:"80px", marginRight:"80px"}}></canvas>
            </div>
        </div>



</div>

    );
    };

    export default MenuEstadisticas;