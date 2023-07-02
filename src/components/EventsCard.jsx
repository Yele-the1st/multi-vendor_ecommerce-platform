import React from "react";
import CountDown from "./CountDown";
import { backend_url } from "../utils/axiosInstance";

const EventsCard = ({ event }) => {
  console.log(event);
  return (
    <div
      className={` mt-10 bg-white rounded-2xl p-4 grid w-full grid-cols-1 font-Ubuntu items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 shadow `}
    >
      <div className=" sm:col-span-4 lg:col-span-5">
        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={`${backend_url}${event?.images && event.images[0]}`}
            alt=""
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 line-clamp-2">
            {event?.name}
          </h2>
          <p className="mt-3">{event.description}</p>
        </section>
        <section className="mt-8">
          <div className="flex py-2 justify-between">
            <div className="flex items-center gap-3">
              <h4 className={`text-lg font-semibold font-Source`}>
                $
                {event?.discountedPrice
                  ? event?.discountedPrice
                  : event?.originalPrice}
              </h4>
              {event?.discountedPrice && event?.originalPrice && (
                <h3 className=" line-through text-gray-600 font-Source">
                  ${event?.originalPrice}
                </h3>
              )}
            </div>
            <div className=" whitespace-nowrap pr-3 font-medium text-lg text-green-500">
              {event?.sold_out} Sold
            </div>
          </div>
        </section>
        <section className="mt-10">
          <CountDown
            startDate={event.start_date}
            finishDate={event.finish_date}
          />
        </section>
      </div>
    </div>
  );
};

export default EventsCard;
