import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function SearchIcon() {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  return (
    <>
      <button
        data-testid="search-top-btn"
        type="button"
        src={ searchIcon }
        onClick={ () => handleClick() }
      >
        <img
          src={ searchIcon }
          alt="search-icon"
        />
      </button>
      <div>
        { showInput && <SearchBar />}
      </div>
    </>
  );
}

export default SearchIcon;
