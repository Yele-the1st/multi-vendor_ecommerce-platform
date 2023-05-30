import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ item }) => {
  return (
    <Link to="/">
      <div className="h-[300px]  min-w-[252px] mx-4 pb-4 hover:shadow-xl bg-[#efeff0] rounded-t-md cursor-pointer relative shadow overflow-hidden">
        <img className="w-full h-[70%] object-cover " src={item.img} alt="" />
        <div className=" flex items-center p-4 gap-5">
          <div className="title">
            <h2 className=" text-lg font-Ubuntu font-bold ">{item.cat}</h2>
            <span className=" font-Source text-sm font-light">
              {item.username}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
