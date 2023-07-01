import { useSearchParams } from "react-router-dom";
import { apiClient } from "../utils/queryClient";
import { useQuery } from "react-query";

export function useItems() {
  const [search] = useSearchParams();

  return useQuery(
    ["products", search.toString()],
    async () => {
      const query = search.get("query");

      if (!query || query.trim() === "") {
        return Promise.resolve([]); // Return an empty array when the query is empty
      }

      const res = await apiClient.get("/products/search", {
        params: { query },
      });
      return res.data;
    },
    {
      staleTime: 120000,
    }
  );
}

export function useProductQuery() {
  const [search] = useSearchParams();

  return useQuery(
    [
      "productsQuery",
      search.get("page"),
      search.get("sort"),
      search.get("priceRange"),
    ],
    async () => {
      const query = {
        page: search.get("page"),
        sort: search.get("sort"),
        priceRange: search.get("priceRange"),
      };

      // if (!query || query.trim() === "") {
      //   return Promise.resolve([]); // Return an empty array when the query is empty
      // }

      const res = await apiClient.get("/products/products", {
        params: query,
      });
      return res.data;
    },
    {
      staleTime: 120000,
    }
  );
}
