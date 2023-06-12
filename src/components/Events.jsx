import React from "react";
import EventsCard from "./EventsCard";
import styles from "../styles/styles";

const Events = () => {
  return (
    <div className={` ${styles.section}  px-4 lg:px-12`}>
      <div>
        <h1 className="mt-5 text-3xl font-bold font-Ubuntu tracking-tight text-gray-900 sm:text-4xl">
          All Events
        </h1>
      </div>

      <div className="w-full grid">
        <EventsCard />
        <EventsCard />
      </div>
    </div>
  );
};

export default Events;
