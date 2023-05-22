import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FetchMealsContext } from '../context/FetchMealsContext';
import { FetchDrinksContext } from '../context/FetchDrinksContext';
import DetailsMeals from '../components/DetailsMeals';
import DetailsDrinks from '../components/DetailsDrinks';

function RecipeDetails() {
  const { fetchDetailsMeals } = useContext(FetchMealsContext);
  const { fetchDetailsDrinks } = useContext(FetchDrinksContext);
  const location = useLocation().pathname;
  const noMagicMeals = 6;
  const noMagicDrinks = 7;
  const meals = location.slice(1, noMagicMeals);
  const drinks = location.slice(1, noMagicDrinks);
  const { id } = useParams();

  useEffect(() => {
    const fetchAPI = async () => {
      if (meals === 'meals') await fetchDetailsMeals(id);
      if (drinks === 'drinks') await fetchDetailsDrinks(id);
    };
    fetchAPI();
  }, []);

  return (
    <div>
      {
        meals === 'meals' ? <DetailsMeals /> : <DetailsDrinks />
      }
    </div>
  );
}

export default RecipeDetails;
