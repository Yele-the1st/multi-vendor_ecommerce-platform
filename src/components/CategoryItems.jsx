import { Link } from "react-router-dom";

const CategoryItems = ({ setVisible, link, title, description, imageUrl }) => {
  return (
    <div className=" pb-3">
      <Link
        to={link}
        onClick={() => setVisible(false)}
        className="w-full max-w-full flex py-7 pl-7 pr-9 hover:bg-[#f6f6f4] rounded-[20px] justify-between items-center transition-all duration-300 ease-in-out delay-0  "
      >
        <div className=" flex items-center">
          <div className="w-16 h-16 bg-white min-h-[64px] min-w-[64px] border-[1.5px] border-[#e6e7e8] flex justify-center items-center mr-5 p-3.5 rounded-[20px] ">
            <img
              src={imageUrl}
              alt=""
              className=" max-w-full align-middle "
              loading="lazy"
            />
          </div>
          <div>
            <div className=" font-Fira text-base font-medium text-black">
              {title}
            </div>
            <div class=" text-sm text-[#6c6d78] font-Ubuntu">{description}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItems;
