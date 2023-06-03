import React from "react";
import styles from "../styles/styles";
import {
  StarIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import SingleCarousel from "../components/carousels/SingleCarousel";
import Card from "../components/card/Card";
import { productData } from "../static/data";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  return (
    <div className={` ${styles.section} px-4 lg:px-12`}>
      <div className="py-8 sm:py-10">
        <div className=" float-left w-[67%] mb-9">
          <div className=" mr-8 ">
            <div className="pb-6">
              <h1>Back to search results</h1>
            </div>
            <div className="w-auto">
              <SingleCarousel>
                {productData.map((card) => (
                  <Card key={card.id} item={card} />
                ))}
              </SingleCarousel>
            </div>
          </div>
        </div>

        <div className="mb-8 float-right w-[33%] flex flex-col ">
          <div className="pr-8 flex flex-col"></div>
          <div className=" flex items-center justify-between">
            <h3 className=" font-normal">1 AI generated Image</h3>
            <h2 className=" font-semibold">$ 59.99</h2>
          </div>
          <p className=" text-[gray] my-2.5 ">
            I will ceate a unique high quality AI generated image based on a
            description that you give me
          </p>
          <div className=" flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 ">
              <ClockIcon className="w-6 h-6" />
              <span>2 days Delivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ArrowPathIcon className="w-6 h-6" />
              <span>3 Revisions</span>
            </div>
          </div>
          <button className="bg-black text-white font-semibold text-base rounded-md py-3 px-6 items-center">
            Continue
          </button>
        </div>

        <div className=" float-right w-[33%]">
          <div className="pr-8">
            <div className="flex items-center gap-2.5 text-[gray]">
              <CheckIcon className=" w-6 h-6 stroke-green-500 " />
              <span>Prompt writing</span>
            </div>
            <div className="flex items-center gap-2.5 text-[gray]">
              <CheckIcon className=" w-6 h-6 stroke-green-500 " />
              <span>Prompt writing</span>
            </div>
            <div className="flex items-center gap-2.5 text-[gray]">
              <CheckIcon className=" w-6 h-6 stroke-green-500 " />
              <span>Prompt writing</span>
            </div>
            <div className="flex items-center gap-2.5 text-[gray]">
              <CheckIcon className=" w-6 h-6 stroke-green-500 " />
              <span>Prompt writing</span>
            </div>
          </div>
        </div>
        <div className=" clear-left w-[60%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          placeat tempore quidem fugiat suscipit delectus ipsam doloremque nam
          ab, illum laborum cupiditate enim, quaerat distinctio impedit in
          consequatur. Delectus, dolore?
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
