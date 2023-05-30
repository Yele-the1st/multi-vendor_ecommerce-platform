import React, { useState, useEffect, useRef, useCallback } from "react";

const useSearch = (initialData) => {
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    const results = performSearch(event.target.value);
    setSearchResults(results);
  };

  const performSearch = (query) => {
    const filteredResults = initialData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredResults;
  };

  const handleClickOutside = useCallback(
    (event) => {
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
    },
    [setIsOpen, setSearchQuery, setSearchResults]
  );

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
