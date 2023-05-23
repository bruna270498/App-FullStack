import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const getSorage = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(getSorage);
  const [clickedShare, setClickedShare] = useState(false);
  const [fav, setFav] = useState(doneRecipes);
  const history = useHistory();

  // console.log(fav);

  function handleClick(value) {
    setFav(value === 'all' ? doneRecipes : doneRecipes
      .filter((elem) => elem.type === value));
  }

  const share = (type, id) => {
    const link = `http://localhost:3000/${type}s/${id}`;
    setClickedShare(true);
    navigator.clipboard.writeText(link);
  };

  const redirect = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ (e) => handleClick(e.target.value) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ (e) => handleClick(e.target.value) }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ (e) => handleClick(e.target.value) }
      >
        Drinks
      </button>
      {
        doneRecipes && (
          fav.map((elem, index) => (
            elem.type === 'drink' ? (
              <div
                key={ elem.id }
              >
                <button
                  type="button"
                  src={ elem.image }
                  data-testid="redirect-btn"
                  onClick={ () => redirect(elem.type, elem.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ elem.image }
                    alt={ elem.name }
                    height="100px"
                    width="100px"
                  />
                  <h1
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { elem.name }
                  </h1>
                </button>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { elem.alcoholicOrNot }
                </h3>
                <h4
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { elem.doneDate }
                </h4>
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => share(elem.type, elem.id) }
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
                    alt="Ícone de compartilhamento"
                  />
                </button>
                { clickedShare && <p>Link copied!</p> }
              </div>
            ) : (
              <div
                key={ elem.id }
              >
                <button
                  type="button"
                  src={ elem.image }
                  data-testid="redirect-btn"
                  onClick={ () => redirect(elem.type, elem.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ elem.image }
                    alt={ elem.name }
                    height="100px"
                    width="100px"
                  />
                  <h1
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { elem.name }
                  </h1>
                </button>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${elem.nationality} - ${elem.category}` }
                </h3>
                <h4
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { elem.doneDate }
                </h4>
                {
                  elem.tags.map((e) => (
                    <p
                      key={ e }
                      data-testid={ `${index}-${e}-horizontal-tag` }
                    >
                      { e }
                    </p>
                  ))
                }
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => share(elem.type, elem.id) }
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
                    alt="Ícone de compartilhamento"
                  />
                </button>
                { clickedShare && <p>Link copied!</p> }
              </div>
            )
          ))
        )
      }
    </div>
  );
}

export default DoneRecipes;
