import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { FetchDrinksContext } from '../context/FetchDrinksContext';
import { FetchMealsContext } from '../context/FetchMealsContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailsDrinks() {
  const [clickedShare, setClickedShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { detailsDrinks } = useContext(FetchDrinksContext);
  const {
    recomendationMeals,
    fetchRecomendationMeals,
  } = useContext(FetchMealsContext);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchRecomendationMeals();
    };
    fetchAPI();
    const favoritesRecip = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const favorite = favoritesRecip.some((e) => e.id === id);
    setIsFavorite(favorite);
  }, []);

  const startRecipe = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  const share = () => {
    const link = `http://localhost:3000/drinks/${id}`;
    setClickedShare(true);
    navigator.clipboard.writeText(link);
  };

  const favButton = (elem) => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (!isFavorite) {
      favoritesRecipes.push({
        id: elem.idDrink,
        type: 'drink',
        nationality: '',
        category: elem.strCategory,
        alcoholicOrNot: elem.strAlcoholic,
        name: elem.strDrink,
        image: elem.strDrinkThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes
        .filter((e) => e.id !== id)));
    }
    setIsFavorite(!isFavorite);
  };

  const noMagic = 6;
  const recomendation = recomendationMeals.slice(0, noMagic);
  const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  return (
    <div>
      {
        detailsDrinks.map((elem) => (
          <div key={ elem.idDrink }>
            <img
              src={ elem.strDrinkThumb }
              alt={ elem.strDrink }
              data-testid="recipe-photo"
              height="200px"
              width="200px"
            />
            <h1 data-testid="recipe-title">{ elem.strDrink }</h1>
            <h3 data-testid="recipe-category">{ elem.strAlcoholic }</h3>
            <ul>
              {Object.keys(elem).reduce((acc, cur) => {
                if (cur.includes('Ingredient')
                && elem[cur] !== ''
                && elem[cur] !== null) {
                  return [...acc, elem[cur]];
                }
                return acc;
              }, []).map((e, i) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {`${e} - ${elem[`strMeasure${i + 1}`]}`}
                </li>
              ))}
            </ul>
            <p data-testid="instructions">{ elem.strInstructions}</p>
            <button
              data-testid="share-btn"
              onClick={ share }
            >
              Compartilhar
            </button>
            { clickedShare && <p>Link copied!</p> }
            <button
              type="submit"
              data-testid="favorite-btn"
              onClick={ () => favButton(elem) }
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            >
              <img
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt={ elem.strMeal }
              />
            </button>
          </div>
        ))
      }
      <h3>Recomendações</h3>
      <Carousel>
        {
          recomendation.map((elem, index) => (
            <Carousel.Item
              key={ elem + index }
            >
              <img
                data-testid={ `${index}-recommendation-card` }
                src={ elem.strMealThumb }
                alt={ elem.strMeal }
                width="100px"
                height="100px"
              />
              <Carousel.Caption>
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  {elem.strMeal}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        }
      </Carousel>
      <button
        data-testid="start-recipe-btn"
        className="startRecipe"
        onClick={ startRecipe }
      >
        { getStorage === null ? 'Start Recipe' : 'Continue Recipe'}
      </button>
    </div>
  );
}

export default DetailsDrinks;
