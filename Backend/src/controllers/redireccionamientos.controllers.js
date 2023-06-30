import { getEstudianteXperfil } from "./estudiantePerfil.controllers";

export const paginaCoordinacion= async (req,res)=>{
    res.send('http://127.0.0.1:5173/src/html/Coordinacion_menu.html');
}

export const paginaJefatura= async (req,res)=>{
    res.send('http://127.0.0.1:5173/src/html/Jefatura_menu.html');
}
export const paginaAdmin= async (req,res)=>{
    
    res.send('http://127.0.0.1:5173/src/html/Administracion.html');
}

export const paginaEstudianttes= async (req,res)=>{
    res.send('http://127.0.0.1:5173/src/html/Estudiante.html');
}

export const paginaDocente= async (req,res)=>{
    res.send('http://127.0.0.1:5173/src/html/Docente.html');
}