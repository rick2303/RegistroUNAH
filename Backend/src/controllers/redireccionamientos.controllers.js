const path = require('path');

export const paginaCoordinacion= async (req,res)=>{
    const currentDir = __dirname;
    const frontendDir = path.join(currentDir, '..','..', '..', 'Frontend', 'FrontendRegistroUNAH');
    const indexPath = path.join(frontendDir, 'coordinacion.html');
    console.log(indexPath);
    res.sendFile(indexPath)
}

export const paginaJefatura= async (req,res)=>{
    const currentDir = __dirname;
    const frontendDir = path.join(currentDir, '..','..', '..', 'Frontend', 'FrontendRegistroUNAH');
    const indexPath = path.join(frontendDir, 'jefatura.html');
    console.log(indexPath);
    res.sendFile(indexPath)
}
export const paginaAdmin= async (req,res)=>{
    const currentDir = __dirname;
    const frontendDir = path.join(currentDir, '..','..', '..', 'Frontend', 'FrontendRegistroUNAH');
    const indexPath = path.join(frontendDir, 'admin.html');
    console.log(indexPath);
    res.sendFile(indexPath)
}

export const paginaEstudianttes= async (req,res)=>{
    const currentDir = __dirname;
    const frontendDir = path.join(currentDir, '..','..', '..', 'Frontend', 'FrontendRegistroUNAH');
    const indexPath = path.join(frontendDir, 'estudiantes.html');
    console.log(indexPath);
    res.sendFile(indexPath)
}

export const paginaDocente= async (req,res)=>{
    const currentDir = __dirname;
    const frontendDir = path.join(currentDir, '..','..', '..', 'Frontend', 'FrontendRegistroUNAH');
    const indexPath = path.join(frontendDir, 'docente.html');
    console.log(indexPath);
    res.sendFile(indexPath)
}