import React from "react";
import CountDown from "./CountDown";

const EventsCard = () => {
  return (
    <div
      className={` mt-10 bg-white rounded-2xl p-4 grid w-full grid-cols-1 font-Ubuntu items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 shadow `}
    >
      <div className=" sm:col-span-4 lg:col-span-5">
        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
          <img
            src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 line-clamp-2">
            Hublot 23 276rim Silverware
          </h2>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            unde. Voluptatem iste, maxime non quas incidunt consequatur quae
            commodi vitae, distinctio possimus enim blanditiis quos natus
            placeat voluptate laborum quibusdam? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Consequuntur aperiam est architecto
            veniam ut odio vel nemo dignissimos molestiae vero neque suscipit
            omnis labore, inventore doloribus aspernatur provident dolor atque!
          </p>
        </section>
        <section className="mt-8">
          <div className="flex py-2 justify-between">
            <div className="flex text-2xl font-Source items-center gap-3">
              <h4 className={``}>$999</h4>

              <h3 className=" text-lg line-through text-red-500 font-Source ">
                $1200
              </h3>
            </div>
            <div className=" whitespace-nowrap pr-3 font-medium text-lg text-green-500">
              120 Sold
            </div>
          </div>
        </section>
        <section className="mt-10">
          <CountDown />
        </section>
      </div>
    </div>
  );
};

export default EventsCard;
