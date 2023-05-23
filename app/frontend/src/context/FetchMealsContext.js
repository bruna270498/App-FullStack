import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const FetchMealsContext = createContext();

function FetchMealsProvider({ children }) {
  const [searchMeals, setSearchMeals] = useState([]);
  const [detailsMeals, setdetailsMeals] = useState([]);
  const [searchCategory, setCategory] = useState([]);
  const [recomendationMeals, setRecomendationMeals] = useState([]);

  const fetchMealsAPI = async (param1, param2 = '') => {
    let URL = '';
    if (param1 === 'i' || param1 === 'c') {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?${param1}=${param2}`;
    } else {
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?${param1}=${param2}`;
    }
    const response = await fetch(URL);
    const json = await response.json();
    setSearchMeals(json.meals);
  };

  const fetchCategoryMealsAPI = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    const response = await fetch(URL);
    const json = await response.json();
    setCategory(json.meals);
  };

  const fetchDetailsMeals = async (param1) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param1}`;

    const response = await fetch(URL);
    const json = await response.json();
    setdetailsMeals(json.meals);
  };

  const fetchRecomendationMeals = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const response = await fetch(URL);
    const json = await response.json();
    setRecomendationMeals(json.meals);
  };

  const contextValue = useMemo(() => ({
    searchMeals,
    detailsMeals,
    searchCategory,
    recomendationMeals,
    fetchMealsAPI,
    fetchCategoryMealsAPI,
    fetchDetailsMeals,
    fetchRecomendationMeals,
  }), [searchMeals, detailsMeals, searchCategory, recomendationMeals]);

  return (
    <FetchMealsContext.Provider value={ contextValue }>
      {children}
    </FetchMealsContext.Provider>
  );
}

FetchMealsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FetchMealsProvider;
