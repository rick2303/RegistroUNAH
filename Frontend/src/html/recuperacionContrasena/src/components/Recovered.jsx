import React from "react";

export default function Recovered() {
  return (
    <div>
      <section class="h-screen">
        <div class="px-6 h-full text-gray-800">
          <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://www.internetmatters.org/connecting-safely-online/wp-content/uploads/sites/2/2020/06/CYP-passwords-usernames.png"
                class="w-full"
                alt="Sample image"
              />
            </div>
            <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div class="flex flex-row items-center justify-center lg:justify-start">
                  <h1 class="text-2xl font-bold mb-0 mr-4">
                    Contraseña cambiada de manera EXITOSA {" "}
                  </h1>
                </div>

                <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <h2>Regrese a la pagina principal para iniciar Sesión aqui: </h2>
                  <hr></hr>
                  <a  href="http://127.0.0.1:5173" > Página principal</a> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}