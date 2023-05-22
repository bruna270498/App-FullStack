import React, { useContext, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import DrinksFilter from './DrinksFilter';
import RenderDrinkCard from './RenderDrinkCard';
import { FetchDrinksContext } from '../context/FetchDrinksContext';

function Drinks() {
  const { searchDrinks, fetchDrinksAPI } = useContext(FetchDrinksContext);

  useEffect(() => {
    const fetch = async () => {
      await fetchDrinksAPI('s');
    };
    fetch();
  }, []);

  return (
    <div>
      <Header />
      <DrinksFilter />
      { searchDrinks === null
        ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
        : <RenderDrinkCard result={ searchDrinks } />}
      <Footer />
    </div>
  );
}

export default Drinks;
