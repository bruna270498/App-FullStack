import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const FetchDrinksContext = createContext();

function FetchDrinksProvider({ children }) {
  const [searchDrinks, setSearchDrinks] = useState([]);
  const [searchCategory, setCategory] = useState([]);
  const [detailsDrinks, setdetailsDrinks] = useState([]);
  const [recomendationDrinks, setRecomendationDrinks] = useState([]);

  const fetchDrinksAPI = async (param1, param2 = '') => {
    let URL = '';
    if (param1 === 'i' || param1 === 'c') {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${param1}=${param2}`;
    } else {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${param1}=${param2}`;
    }
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setSearchDrinks(json.drinks);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategoryDrinksAPI = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const response = await fetch(URL);
    const json = await response.json();
    setCategory(json.drinks);
  };

  const fetchDetailsDrinks = async (param1) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${param1}`;

    const response = await fetch(URL);
    const json = await response.json();
    setdetailsDrinks(json.drinks);
  };

  const fetchRecomendationDrinks = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    const response = await fetch(URL);
    const json = await response.json();
    setRecomendationDrinks(json.drinks);
  };

  const contextValue = useMemo(() => ({
    searchDrinks,
    searchCategory,
    detailsDrinks,
    recomendationDrinks,
    fetchDrinksAPI,
    fetchCategoryDrinksAPI,
    fetchDetailsDrinks,
    fetchRecomendationDrinks,
  }), [searchDrinks, searchCategory, detailsDrinks, recomendationDrinks]);

  return (
    <FetchDrinksContext.Provider value={ contextValue }>
      {children}
    </FetchDrinksContext.Provider>
  );
}

FetchDrinksProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FetchDrinksProvider;
