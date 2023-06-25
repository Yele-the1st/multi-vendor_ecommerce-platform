import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { axiosInstanceGet } from "../utils/axiosInstance";

const useSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleSearchChange = useCallback(async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      const response = await axiosInstanceGet.get("/products/search", {
        params: { query },
      });
      console.error(response.data.results);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleClickOutside = useCallback((event) => {
    const clickedElementIsLink = event.target.tagName.toLowerCase() === "a";
    const clickedElementIsOutsideSearch =
      searchRef.current && !searchRef.current.contains(event.target);
    const clickedElementIsOutsideResultPane =
      resultRef.current && !resultRef.current.contains(event.target);

    if (
      (clickedElementIsLink && clickedElementIsOutsideSearch) ||
      clickedElementIsOutsideResultPane
    ) {
      setIsOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    isOpen,
    searchQuery,
    searchResults,
    searchRef,
    resultRef,
    handleSearchClick,
    handleSearchChange,
  };
};

export default useSearch;

// // for when enter is pressed on the key board
// import { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";

// const useSearch = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const searchRef = useRef(null);
//   const resultRef = useRef(null);

//   useEffect(() => {
//     if (isOpen) {
//       searchRef.current.focus();
//     }
//   }, [isOpen]);

//   const handleSearchClick = () => {
//     setIsOpen(true);
//   };

//   const handleSearchChange = useCallback(async (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);

//     if (event.key === "Enter") {
//       try {
//         const response = await axios.get("/api/search", {
//           params: { query },
//         });

//         setSearchResults(response.data.results);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }, []);

//   const handleClickOutside = useCallback(
//     (event) => {
//       const clickedElementIsLink = event.target.tagName.toLowerCase() === "a";
//       const clickedElementIsOutsideSearch =
//         searchRef.current && !searchRef.current.contains(event.target);
//       const clickedElementIsOutsideResultPane =
//         resultRef.current && !resultRef.current.contains(event.target);

//       if (
//         (clickedElementIsLink && clickedElementIsOutsideSearch) ||
//         clickedElementIsOutsideResultPane
//       ) {
//         setIsOpen(false);
//         setSearchQuery("");
//         setSearchResults([]);
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [handleClickOutside]);

//   return {
//     isOpen,
//     searchQuery,
//     searchResults,
//     searchRef,
//     resultRef,
//     handleSearchClick,
//     handleSearchChange,
//   };
// };

// export default useSearch;
