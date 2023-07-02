
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function Fotos_estudiante() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const inputFileRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 3); // Limitar a tres archivos
    setSelectedFiles(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });

      fetch("http://localhost:5000/...", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status === 200) {
            alert('Archivos recibidos y procesados correctamente');
            return response;
          }
        })
        .finally(() => {
          setSelectedFiles([]); // Reiniciar la selección de archivos
          if (inputFileRef.current) {
            inputFileRef.current.value = ""; // Limpiar el campo de entrada de archivos
          }
        });
    }
  };

  return (
    <form className="d-flex justify-content-between align-items-center" onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        ref={inputFileRef}
        accept=".jpg, .jpeg, .png"
        multiple
        max="3"
      />
      <button className=" rounded-lg bg-blue-800 hover:bg-blue-500 text-white shadow h-8 w-14" type="submit">Cargar</button>
      
  
    </form>
  );
}




export default Fotos_estudiante