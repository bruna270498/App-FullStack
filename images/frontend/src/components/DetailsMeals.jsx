import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { FetchMealsContext } from '../context/FetchMealsContext';
import { FetchDrinksContext } from '../context/FetchDrinksContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import Recomendations from './Recomendations';

function DetailsMeals() {
  const [clickedShare, setClickedShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { detailsMeals } = useContext(FetchMealsContext);
  const {
    recomendationDrinks,
    fetchRecomendationDrinks,
  } = useContext(FetchDrinksContext);
  const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchRecomendationDrinks();
    };
    fetchAPI();
    const favoritesRecip = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const favorite = favoritesRecip.some((e) => e.id === id);
    setIsFavorite(favorite);
  }, []);

  const startRecipe = () => {
    history.push(`/meals/${id}/in-progress`);
  };

  const share = () => {
    const link = `http://localhost:3000/meals/${id}`;
    setClickedShare(true);
    navigator.clipboard.writeText(link);
  };

  const favButton = (elem) => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (!isFavorite) {
      favoritesRecipes.push({
        id: elem.idMeal,
        type: 'meal',
        nationality: elem.strArea,
        category: elem.strCategory,
        alcoholicOrNot: '',
        name: elem.strMeal,
        image: elem.strMealThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes
        .filter((e) => e.id !== id)));
    }
    setIsFavorite(!isFavorite);
  };

  const linkToYoutube = (link) => {
    const newLink = link.split('=');
    return (`https://www.youtube.com/embed/${newLink[1]}`);
  };

  const noMagic = 6;
  const recomendation = recomendationDrinks.slice(0, noMagic);

  return (
    <div>
      {
        detailsMeals.map((elem) => (
          <div key={ elem.idMeal }>
            <img
              src={ elem.strMealThumb }
              alt={ elem.strMeal }
              data-testid="recipe-photo"
              height="200px"
              width="200px"
            />
            <h1 data-testid="recipe-title">{ elem.strMeal }</h1>
            <h3 data-testid="recipe-category">{ elem.strCategory }</h3>
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
            <iframe
              data-testid="video"
              title="recipe"
              width="280px"
              height="280px"
              // src={ `https://www.youtube.com/embed/${elem.strYoutube}` }
              src={ linkToYoutube(elem.strYoutube) }
            />
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
                src={ elem.strDrinkThumb }
                alt={ elem.strDrink }
                width="100px"
                height="100px"
              />
              <Carousel.Caption>
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  {elem.strDrink}
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

export default DetailsMeals;
