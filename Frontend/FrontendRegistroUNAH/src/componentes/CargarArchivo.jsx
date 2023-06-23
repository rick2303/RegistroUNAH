import {useState} from 'react'

function CargarArchivo() {
 
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        // realizar una solicitud HTTP al backend para cargar el archivo.
        // utilizando la función fetch:
  
        fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Manejar la respuesta del backend si es necesario
            console.log(data);
          })
          .catch((error) => {
            // Manejar errores de la solicitud
            console.error(error);
          });
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Cargar</button>
      </form>
    );
  }
  
  


export default CargarArchivo