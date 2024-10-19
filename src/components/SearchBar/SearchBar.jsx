// src/components/SearchBar.js
import "./SearchBar.css"
import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // Debounce the input with a 200ms delay
  const debouncedInput = useDebounce(input, 2000);

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Redirect when debounced input changes
  React.useEffect(() => {
    if (debouncedInput) {
      navigate(`/pokemon/${debouncedInput}`);
    }
  }, [debouncedInput, navigate]);

  return (
    <div className="searchBar">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search Pokémon"
      />
    </div>
  );
};

export default SearchBar;
