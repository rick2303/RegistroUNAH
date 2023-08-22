import React from 'react';
import '../App.css';
import Navbar from '../components/NavbarEstudiante';
import ChatApp from '../components/chat'; // Reemplaza la ruta con la ubicación correcta

function AppChat() {
  return (
    <>
      <Navbar /> 
      <ChatApp />
    </>
  );
}

export default AppChat;
