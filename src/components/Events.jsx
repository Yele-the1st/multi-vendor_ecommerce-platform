import React, { Suspense } from "react";
import EventsCard from "./EventsCard";
import styles from "../styles/styles";

import { SwatchIcon, TicketIcon } from "@heroicons/react/24/solid";

const Events = ({ events }) => {
  return (
    <div className={` ${styles.section}  mt-6 px-4 lg:px-12`}>
      <div className="flex items-center mb-6">
        <SwatchIcon className="w-5 h-5 mr-2 " />
        <h1 className=" font-Ubuntu text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          All Events
        </h1>
      </div>
      <div className="w-full grid">
        {events && events.length > 0
          ? events.map((item, index) => <EventsCard event={item} key={index} />)
          : null}
      </div>
    </div>
  );
};

export default Events;
