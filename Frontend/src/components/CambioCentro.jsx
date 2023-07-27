import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "styled-components";

const MenuCambioCentro = () => {
  const [Centro, setCentro] = useState(''); 
  const [inputValue, setInputValue] = useState(''); 

  const handleSubmit = () => {


    const data = {
      centro: Centro,
      justificacion: inputValue,
    };


    fetch('http://localhost:5000/subirSolicitud', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
       
        console.log('Solicitud exitosa');
        
        setCentro('');
        setInputValue('');
      })
      .catch((error) => {
        
        console.error('Error en la Solicitud', error);
      });
  };

  return (
    <div className="App">
      <h1 className="text-2xl text-center font-bold pt-4 pb-5 text-gray-900 sm:text-3xl">
        Cambio de Centro
      </h1>
      <div className="container">
        <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
          Seleccionar el Centro al que desea trasladarse
        </p>

        <div className="form-group">
          <label htmlFor="centroRegional">Centro Regional:</label>
          <select
            id="centroRegional"
            className="control"
            value={Centro}
            onChange={(e) => setCentro(e.target.value)}
          >
            <option value=""></option>
            <option value="CU">Ciudad Universitaria</option>
            <option value="VS">Valle de Sula</option>
            <option value="CURC">CURC</option>
            <option value="CURNO">CURNO</option>
            <option value="CURLA">CURLA</option>
            <option value="CURLP">CURLP</option>
            <option value="TEC-DANLI">TEC-DANLI</option>
            <option value="TEC-AGUAN">TEC-AGUAN</option>
          </select>
        </div>

        <p className="text-xl font-normal pt-4 pb-3 text-gray-900 sm:text-1xl text-left">
          Justificar el cambio de centro
        </p>

        <div className="d-flex align-items-center">
          <div className="mb-2 me-2 w-75">
            <textarea
              className="form-control form-control-sm border border-2 p-4 rounded"
              id="exampleFormControlTextarea1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1">
            <button type="button" className="btn btn-success" onClick={handleSubmit}>
              Enviar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCambioCentro;