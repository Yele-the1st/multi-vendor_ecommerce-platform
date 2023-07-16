import {
  ArchiveBoxArrowDownIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  CubeIcon,
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TagIcon } from "@heroicons/react/24/solid";
import { createProduct } from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import { resetSuccess } from "../../redux/slices/productSlice";
import { cardData } from "../../data/CategoryData";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/shop/dashboard");
      dispatch(resetSuccess()); // Reset the success state
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountedPrice", discountedPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    // for (const entry of newForm.entries()) {
    //   console.log(entry);
    // }

    dispatch(createProduct(newForm));

    // Clear form input values
    setName("");
    setDescription("");
    setCategory("");
    setTags("");
    setOriginalPrice("");
    setDiscountedPrice("");
    setStock("");
    setImages([]);
  };

  return (
    <div className=" h-full w-full sm:max-w-max  py-8 px-4 sm:px-10 ">
      <div className=" bg-white h-full overflow-hidden shadow rounded-2xl sm:px-10 px-4">
        <div className="sm-mx-auto sm:max-w-lg ">
          <h2 className=" py-8 tracking-widest text-center text-3xl font-extrabold text-gray-900 font-Fira">
            Create a Product
          </h2>
        </div>
        <div className="h-full overflow-y-scroll sm:mx-auto font-Ubuntu sm:max-w-lg ">
          <form className=" mb-32" onSubmit={handleSubmit}>
            <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Name <span className=" text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                    <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                      <CubeIcon className=" w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Description <span className=" text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    name="about"
                    rows={3}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="country"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Category <span className=" text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    value={category}
                    className="block w-full rounded-md border-0 p-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-lg sm:leading-6"
                  >
                    <option value={`Choose a category`}></option>
                    {cardData &&
                      cardData.map((i, index) => (
                        <option value={i.value} key={index}>
                          {i.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="username"
                  className="block whitespace-nowrap font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                    <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                      <ArchiveBoxArrowDownIcon className=" w-5 h-5" />
                    </span>
                    <input
                      type="number"
                      name="OriginalPrice"
                      value={stock}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="username"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Tags
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                    <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                      <TagIcon className=" w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Original Price <span className=" text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                    <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                      <BanknotesIcon className=" w-5 h-5" />
                    </span>
                    <input
                      type="number"
                      name="OriginalPrice"
                      value={originalPrice}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Discounted Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                    <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                      <CheckBadgeIcon className=" w-5 h-5" />
                    </span>
                    <input
                      type="number"
                      name="OriginalPrice"
                      value={discountedPrice}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Upload Images <span className=" text-red-500">*</span>
                </label>
                <div className=" relative mt-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <label className=" bg-transparent cursor-pointer absolute inset-0 flex items-center justify-center ">
                    <div className=" max-w-max bg-white shadow-lg p-2 rounded-2xl flex flex-col items-center justify-center ">
                      <PhotoIcon
                        className="mx-auto h-10 w-10 text-gray-900 shadow-2xl"
                        aria-hidden="true"
                      />
                    </div>

                    <input
                      onChange={handleImageChange}
                      name="images"
                      type="file"
                      multiple
                      className="sr-only"
                    />
                  </label>
                  <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                    {images &&
                      images.map((i, index) => (
                        <img
                          src={URL.createObjectURL(i)}
                          key={index}
                          alt=""
                          className=" w-full h-full object-cover"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className=" col-span-full">
                <button
                  className=" w-full group bg-black hover:scale-y-105 hover:shadow-xl  text-white   font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
                  type="submit"
                >
                  <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                    Create
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
