import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function RenderDrinkCard({ result }) {
  const noMagic12 = 12;
  const data = result.slice(0, noMagic12);
  const history = useHistory();

  if (result.length === 1) {
    const { idDrink } = result[0];
    history.push(`/drinks/${idDrink}`);
  }

  const handleClick = (param) => {
    history.push(`/drinks/${param}`);
  };

  return (
    <div>
      {data.map((e, index) => (
        <button
          key={ e.idDrink + index }
          onClick={ () => handleClick(e.idDrink) }
        >
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ e.strDrinkThumb }
              alt={ e.srtDrink }
              height="50px"
              width="50px"
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { e.strDrink }
            </p>
          </div>

        </button>
      ))}
    </div>
  );
}

RenderDrinkCard.propTypes = {
  result: PropTypes.arrayOf(Array).isRequired,
};

export default RenderDrinkCard;
