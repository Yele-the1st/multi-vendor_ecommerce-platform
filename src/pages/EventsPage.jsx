import React, { Suspense } from "react";
import Events from "../components/Events";
import { axiosInstanceGet } from "../utils/axiosInstance";
import { Await, defer, useLoaderData } from "react-router-dom";
import Loader from "../components/routes/Loader";

const EventsPage = () => {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={events}>
        {(loadedEvents) => <Events events={loadedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventsPage;

export const loadEvents = async () => {
  try {
    const response = await axiosInstanceGet.get(`/events/get-all-events`);
    return response.data.events;
  } catch (error) {
    console.error(error);
    // Handle error
    throw new Response(JSON.stringify({ message: "Could not Fetch Shops" }), {
      status: 500,
    });
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
