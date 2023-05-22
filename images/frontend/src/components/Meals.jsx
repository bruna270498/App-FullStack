import React, { useContext, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import MealsFilter from './MealsFilter';
import RenderMealCard from './RenderMealCard';
import { FetchMealsContext } from '../context/FetchMealsContext';

function Meals() {
  const { searchMeals, fetchMealsAPI } = useContext(FetchMealsContext);

  useEffect(() => {
    const fetch = async () => {
      await fetchMealsAPI('s');
    };
    fetch();
  }, []);

  return (
    <div>
      <Header />
      <MealsFilter />
      { searchMeals === null
        ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
        : <RenderMealCard result={ searchMeals } /> }
      <Footer />
    </div>
  );
}

export default Meals;
