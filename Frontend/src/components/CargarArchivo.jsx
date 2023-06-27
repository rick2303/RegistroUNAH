import React, { useState, useRef } from "react";

function CargarArchivo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("http://localhost:5000/ReceiveStudents", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status == 400) {
            throw new Error('Error interno del servidor');
          } else {
            throw new Error('"Revisar que el archivo sea CSV y que no tenga datos de estudiantes ya ingresados"');
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          alert(error.message);
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
      <input type="file" onChange={handleFileChange} ref={inputFileRef} accept=".csv" />
      <button type="submit">Cargar</button>
    </form>
  );
}

export default CargarArchivo;
