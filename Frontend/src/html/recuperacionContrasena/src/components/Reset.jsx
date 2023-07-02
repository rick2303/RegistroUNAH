import { useState } from "react"; // Importa useState desde 'react'
import { useContext } from "react";
import { RecoveryContext } from "../App";
import axios from 'axios';


export default function Reset() {
  const { setPage } = useContext(RecoveryContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(""); // Nuevo estado para almacenar el correo electrónico


   // Función para cambiar la contraseña
    const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      // Manejar el caso en que las contraseñas no coincidan
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/updatePassword', { newPassword, email });
      console.log(response.data.message); // Mensaje de éxito desde el backend
      setPage("recovered");
      // Realizar cualquier otra acción necesaria después de cambiar la contraseña
    } catch (error) {
      console.error(error.response.data.error); // Mensaje de error desde el backend
      // Manejar el error de alguna manera adecuada
    }
  };

  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Cambio de contraseña
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
              <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo electrónico personal (@gmail.com)
                </label>
              <input
              type="text"
              name="email"
              id="email"
              placeholder="correo@gmail.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
                <br></br>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirme la contraseña
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">

                </div>
              </div>
            </form>
            <button
              onClick={() => changePassword()}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
