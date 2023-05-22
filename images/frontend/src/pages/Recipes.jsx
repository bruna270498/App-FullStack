import React from 'react';
import { useLocation } from 'react-router-dom';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const location = useLocation().pathname;
  const noMagicMeals = 6;
  const meals = location.slice(1, noMagicMeals);

  return (
    <div>
      {
        meals === 'meals' ? <Meals /> : <Drinks />
      }
    </div>
  );
}

export default Recipes;
