import React, { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import { axiosInstanceGet } from "../utils/axiosInstance";
import styles from "../styles/styles";
import {
  BuildingStorefrontIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/solid";
import ShopCard from "../components/card/ShopCard";
import Loader from "../components/routes/Loader";

const ShopsPage = () => {
  const { shops } = useLoaderData();

  console.log(shops);

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={shops}>
        {(loadedShops) => (
          <div className={` ${styles.section}  mt-6 px-4 lg:px-12`}>
            <div className="flex items-center mb-6">
              <BuildingStorefrontIcon className="w-5 h-5 mr-2 " />
              <h1 className=" font-Ubuntu text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                All Shops
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
              {loadedShops && loadedShops.length > 0
                ? loadedShops.map((item, index) => (
                    <ShopCard shop={item} key={index} />
                  ))
                : null}
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );

  //   return (
  //     <div className={` ${styles.section}  mt-6 px-4 lg:px-12`}>
  //       <div className="flex items-center mb-6">
  //         <BuildingStorefrontIcon className="w-5 h-5 mr-2 " />

  //         <h1 className=" font-Ubuntu text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
  //           All Shops
  //         </h1>
  //       </div>
  //       <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
  //         <ShopCard />
  //       </div>
  //     </div>
  //   );
};

export default ShopsPage;

export const loadShops = async () => {
  try {
    const response = await axiosInstanceGet.get(`/shops/get-all-shops`);
    return response.data.shops;
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
    shops: loadShops(),
  });
};
