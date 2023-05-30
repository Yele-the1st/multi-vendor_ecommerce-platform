import ProjectCard from "./ProjectCard";
import Carousel from "./Carousel";
import { Category } from "../data/CategoryData";
import styles from "../styles/styles";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const CategoryPane = () => {
  return (
    <div className={` ${styles.section}  px-4 mb-8 lg:px-12`}>
      <Carousel name={`Shop our popular categories`}>
        {Category.map((card) => (
          <ProjectCard key={card.id} item={card} />
        ))}
      </Carousel>
      <div className="flex justify-center">
        <button
          className={`py-3 px-4 flex items-center gap-3 rounded-xl font-Ubuntu cursor-pointer shadow bg-transparent text-base font-medium max-w-max hover:gap-5 hover:bg-black hover:text-white  transition-all duration-300 ease-linear delay-0`}
        >
          Discover More
          <ArrowRightIcon className=" w-4 h-4  " />
        </button>
      </div>
    </div>
  );
};

export default CategoryPane;
