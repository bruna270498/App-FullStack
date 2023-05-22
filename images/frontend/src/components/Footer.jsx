import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <div
      className="footer"
      data-testid="footer"
    >
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/drinks') }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="Icone de taça" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        type="button"
        onClick={ () => history.push('/meals') }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="Icone de prato com talheres" />
      </button>
    </div>
  );
}

export default Footer;
