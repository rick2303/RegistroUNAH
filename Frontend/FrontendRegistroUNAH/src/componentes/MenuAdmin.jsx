import React from "react";

function MenuAdmin() {
  return (
    <section className="bg-white">
      <h1 className="text-2xl font-bold pt-3 text-gray-900 sm:text-3xl">
        Administración
      </h1>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-800 via-yellow-400 to-yellow-500 00 p-0.5 shadow-xl transition hover:bg-[length:500%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 !pb-20 !pt-15 sm:p-6">
                <h1>Icono</h1>
              <a href="#">
                <a
                  className="group relative inline-block focus:outline-none focus:ring"
                  href="/download"
                >
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                  <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                    Cargar Estudiantes
                  </span>
                </a>

                </a>

              {/* <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div> */}
            </div>
          </article>
          <article className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm">
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  How to center an element using JavaScript and jQuery
                </h3>
              </a>

              <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div>
            </div>
          </article>
          <article className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm">
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  How to center an element using JavaScript and jQuery
                </h3>
              </a>

              <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div>
            </div>
          </article>
          <article className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm">
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  How to center an element using JavaScript and jQuery
                </h3>
              </a>

              <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div>
            </div>
          </article>
          <article className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm">
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  How to center an element using JavaScript and jQuery
                </h3>
              </a>

              <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
      
    </section>
  );
}

export default MenuAdmin;
