import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  loadShopProducts,
} from "../../redux/actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import Loader from "../routes/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const ShopProducts = () => {
  const { shopProducts, loading, message } = useSelector(
    (state) => state.product
  );
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadShopProducts(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        dispatch(loadShopProducts(seller._id));
        toast.success(message);
      })
      .catch((error) => {
        // Handle error if necessary
        console.log(error);
      });
    navigate("/shop/shop-products");
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },

    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <Button>
                <EyeIcon className="w-5 h-5" />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <TrashIcon className="w-5 h-5" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  shopProducts &&
    shopProducts.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.originalPrice,
        stock: item.stock,
        sold: 10,
      });
    });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" w-full pt-1 mt-6">
          <h2 className=" font-Ubuntu text-3xl lg:text-5xl font-bold py-6 whitespace-nowrap">
            All Products
          </h2>
          <div>
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShopProducts;
