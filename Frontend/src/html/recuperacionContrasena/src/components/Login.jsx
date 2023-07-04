import axios from "axios";
import { useRef } from "react";
import React from "react";
import { useContext } from "react";
import { RecoveryContext } from "../App";

export default function Login() {
  const emailRef = useRef(null);
  const { setPage, setOTP } = useContext(RecoveryContext);


  function nagigateToOtp() {
    const email = emailRef.current.value;
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);
      console.log(email);
      axios
        .post("http://localhost:5001/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => setPage("otp"))
        .catch(console.log);
      return;
    }
    return alert("Por Favor Ingrese un Correo Electrónico");
  }
  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://www.internetmatters.org/connecting-safely-online/wp-content/uploads/sites/2/2020/06/CYP-passwords-usernames.png"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                
                <h1 className="text-4xl font-bold mb-6">Recuperación de Contraseña</h1>
                
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Ingresa tu correo personal para enviarte el codigo de recuperación</p>
                </div>

                <div className="mb-6">
                  <input
                    ref={emailRef}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleEmailFormControlInput"
                    placeholder="Correo Electrónico"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    onClick={() => nagigateToOtp()}
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Siguiente
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}