import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const getSorage = localStorage.getItem('favoriteRecipes');
  const savedRecipes = JSON.parse(getSorage);
  const [favorites, setFavorites] = useState(savedRecipes);
  const [fav, setFav] = useState(favorites);
  const [clickedShare, setClickedShare] = useState(false);
  const history = useHistory();

  const favButton = (id) => {
    const userFavorite = favorites.filter((elem) => elem.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(userFavorite));
    setFav(userFavorite);
    setFavorites(userFavorite);
  };

  function handleClick(value) {
    setFav(value === 'all' ? favorites : favorites
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
        favorites
        && (
          fav && fav.map((elem, index) => (
            elem.type === 'drink' ? (
              <div
                key={ elem.id }
              >
                <button
                  type="button"
                  src={ elem.image }
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
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => favButton(elem.id) }
                  src={ blackHeartIcon }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Ícone de coração"
                  />
                </button>
              </div>
            )
              : (
                <div
                  key={ elem.id }
                >
                  <button
                    type="button"
                    src={ elem.image }
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
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => favButton(elem.id) }
                    src={ blackHeartIcon }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="Ícone de coração"
                    />
                  </button>
                </div>)
          ))
        )
      }
    </div>
  );
}

export default FavoriteRecipes;
