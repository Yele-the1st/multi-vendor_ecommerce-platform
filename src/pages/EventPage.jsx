import React, { useEffect } from "react";
import EventDetails from "../components/EventDetails";
import { useParams } from "react-router-dom";
import SuggestedProduct from "../components/products/SuggestedProduct";
import { loadProduct } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/routes/Loader";
import { useLocation } from "react-router-dom";
import { loadEvent } from "../redux/actions/eventAction";

const EventPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleEvent, loading, message } = useSelector((state) => state.event);
  console.log(singleEvent);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(loadEvent(id));
  }, [dispatch, pathname]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <EventDetails data={singleEvent} />
      {/* {singleProduct && <SuggestedProduct data={singleProduct} />} */}
    </div>
  );
};

export default EventPage;
