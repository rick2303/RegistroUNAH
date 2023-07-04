import React, { useState, useContext, useRef, useEffect } from "react";
import { RecoveryContext } from "../App";
import axios from 'axios';

export default function VerifyOTP() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const otpInputsRefs = useRef([]);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:5001/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("Se ha enviado con éxito una nueva OTP a su correo electrónico."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    alert(
      "El código que has introducido no es correcto, inténtalo de nuevo o vuelve a enviar el enlace"
    );
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  function handleOtpChange(index, e) {
    const value = e.target.value;
    setOTPinput((prevOTPInput) => {
      const newOTPInput = [...prevOTPInput];
      newOTPInput[index] = value;
      return newOTPInput;
    });

    if (value.length >= 1 && otpInputsRefs.current[index + 1]) {
      otpInputsRefs.current[index + 1].focus();
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Correo de verificación</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Hemos enviado un correo a {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {OTPinput.map((value, index) => (
                    <div key={index} className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        value={value}
                        ref={(ref) => (otpInputsRefs.current[index] = ref)}
                        onChange={(e) => handleOtpChange(index, e)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <a
                      onClick={verfiyOTP}
                      className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verificar cuenta
                    </a>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>¿No recibiste ningún correo?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={resendOTP}
                    >
                      {disable ? `Reenviar código OTP en ${timerCount}s` : "Reenviar código OTP"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
