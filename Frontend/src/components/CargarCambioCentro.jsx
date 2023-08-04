import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CargarArchivoCambioCentropdf() {
const [selectedFile, setSelectedFile] = useState(null);
const [rol, setRol] = useState(false);
const [id1, setId1] = useState(false);
const inputFileRef = useRef(null);


useEffect(() => {
    const storedData = localStorage.getItem("userData");

if (storedData) {
    const userData = JSON.parse(storedData);
    const rol = userData.data.Rol;
    setRol(rol);
        const id1 = userData.data.NumCuenta;
        setId1(id1);
    }
}, []); 
const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
};


const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedFile);
    if (selectedFile) {
    const formData = new FormData();
    
    formData.append('file', selectedFile);

    fetch(`http://localhost:5000/CambioCentro/${id1}`, {
        method: "POST",
        body: formData,
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error("Algo crashea");
        }
        return response.json();
      })
      .then((data) => {
        if(data.ok) {
        alert(JSON.stringify(data.message));
        
        }else{
            alert(JSON.stringify(data.message));
            
        }
      })
        .finally(() => {
        setSelectedFile(null); // Reiniciar la selección de archivo
        if (inputFileRef.current) {
            inputFileRef.current.value = ""; // Limpiar el campo de entrada de archivos
        }
        });
    }

};

return (
    <form onSubmit={handleSubmit}>
    <input
        type="file"
        onChange={handleFileChange}
        ref={inputFileRef}
        accept=".pdf"
    />
    <button type="submit">Cargar</button>
    </form>
);
}

export default CargarArchivoCambioCentropdf;