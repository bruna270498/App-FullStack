import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FetchMealsContext } from '../context/FetchMealsContext';
import { FetchDrinksContext } from '../context/FetchDrinksContext';

function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [radio, setRadio] = useState('i');
  const { fetchMealsAPI } = useContext(FetchMealsContext);
  const { fetchDrinksAPI } = useContext(FetchDrinksContext);
  const location = useLocation().pathname;

  const handleClick = async () => {
    if (inputText.length === 0) {
      global.alert('Your search must at least (one) character');
    }
    if (radio === 'f' && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (location === '/meals') await fetchMealsAPI(radio, inputText);
    if (location === '/drinks') await fetchDrinksAPI(radio, inputText);
  };

  return (
    <form>
      <fieldset>
        <input
          type="text"
          name="search-input"
          id="search-input"
          data-testid="search-input"
          onChange={ ({ target }) => setInputText(target.value) }
          placeholder="Search"
        />
        <div>
          <label htmlFor="ingredient-search">
            <input
              type="radio"
              id="ingredient-search"
              name="radio-type"
              value="i"
              defaultChecked={ radio === 'i' }
              onClick={ () => setRadio('i') }
              data-testid="ingredient-search-radio"
            />
            Busca por Ingrediente
          </label>
          <label htmlFor="search-type">
            <input
              type="radio"
              id="search-type"
              name="radio-type"
              value="s"
              defaultChecked={ radio === 's' }
              onClick={ () => setRadio('s') }
              data-testid="name-search-radio"
            />
            Busca por Nome
          </label>
          <label htmlFor="first-letter-type">
            <input
              type="radio"
              id="first-letter-type"
              name="radio-type"
              value="f"
              defaultChecked={ radio === 'f' }
              onClick={ () => setRadio('f') }
              data-testid="first-letter-search-radio"
            />
            Busca pela primeira letra
          </label>
        </div>
        <div>
          <button
            type="button"
            id="exec-search-btn"
            data-testid="exec-search-btn"
            onClick={ () => handleClick() }
          >
            Buscar
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default SearchBar;
