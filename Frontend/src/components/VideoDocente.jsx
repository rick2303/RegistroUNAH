
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function VideoDocente() {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("http://localhost:5000/...", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Archivo recibido y procesado correctamente");
            return response;
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
    <form className="d-flex justify-content-between align-items-center" onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        ref={inputFileRef}
        accept="video/*" // Solo aceptar archivos de video
      />
      <button className="rounded-lg bg-blue-800 hover:bg-blue-500 text-white shadow h-8 w-14" type="submit">
        Cargar
      </button>
    </form>
  );
}

export default VideoDocente;
