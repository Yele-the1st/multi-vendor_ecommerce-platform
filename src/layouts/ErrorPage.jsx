import { Link, useRouteError } from "react-router-dom";

export default function Example() {
  const error = useRouteError();

  console.log(error);

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }
  if (error.status === 404) {
    title = " Page not Found!";
    message = "Could not find resource or Page ";
  }

  return (
    <div className="  relative min-h-screen  flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8 z-10">
      <main className=" grid min-h-full  place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center font-Ubuntu">
          <p className="text-2xl font-semibold  text-pink-600">
            {error.status}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">{message}</p>
          <div className="mt-10 flex items-center whitespace-nowrap justify-center gap-x-6">
            <Link
              to={`/`}
              className=" bg-black text-white group hover:scale-y-105 hover:shadow-xl border-2 border-black mb-3 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
            >
              <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                Go back home <span aria-hidden="true">&rarr;</span>
              </p>
            </Link>
            <button className=" group hover:scale-y-105 hover:shadow-xl border-2 border-black mb-3 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out">
              <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                Contact support
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
