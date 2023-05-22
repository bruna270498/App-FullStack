import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinkInProgress from '../components/DrinkInProgress';
import MealInProgress from '../components/MealInProgress';

function Recipes() {
  const location = useLocation().pathname;
  const noMagicMeals = 6;
  const meals = location.slice(1, noMagicMeals);

  return (
    <div>
      {
        meals === 'meals' ? <MealInProgress /> : <DrinkInProgress />
      }
    </div>
  );
}

export default Recipes;
