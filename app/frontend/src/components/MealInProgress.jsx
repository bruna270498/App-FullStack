import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FetchMealsContext } from '../context/FetchMealsContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../App.css';

function MealInProgress() {
  const [clickedShare, setClickedShare] = useState(false);
  const [allCheckboxes, setAllCheckboxes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { detailsMeals, fetchDetailsMeals } = useContext(FetchMealsContext);
  const history = useHistory();
  const { id } = useParams();
  let quant = 0;

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchDetailsMeals(id);
    };
    fetchAPI();
    const obj = {
      meals: {
        [id]: allCheckboxes,
      },
    };
    const type = 'meals';
    if (localStorage.inProgressRecipes) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ids = Object.keys(inProgressRecipes.meals ? inProgressRecipes.meals : obj);
      if (ids.includes(id)) {
        setAllCheckboxes(inProgressRecipes[type][id]);
      }
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...obj }));
    }
    const favoritesRecip = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const favorite = favoritesRecip.some((e) => e.id === id);
    setIsFavorite(favorite);
  }, []);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgressRecipesType = inProgressRecipes.meals;
    inProgressRecipes.meals = { ...inProgressRecipesType, [id]: allCheckboxes };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [allCheckboxes]);

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    doneRecipes.push({
      id,
      type: 'meal',
      nationality: detailsMeals[0].strArea,
      category: detailsMeals[0].strCategory,
      alcoholicOrNot: '',
      name: detailsMeals[0].strMeal,
      image: detailsMeals[0].strMealThumb,
      doneDate: new Date(),
      tags: detailsMeals[0].strTags.split(','),
    });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
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

  const handleCheckboxChange = ({ target }) => {
    if (allCheckboxes.includes(target.name)) {
      const newCheckboxes = allCheckboxes.filter((e) => e !== target.name);
      setAllCheckboxes(newCheckboxes);
    } else {
      setAllCheckboxes([...allCheckboxes, target.name]);
    }
  };

  const linkToYoutube = (link) => {
    const newLink = link.split('=');
    return (`https://www.youtube.com/embed/${newLink[1]}`);
  };

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
                quant = acc.length;
                return acc;
              }, []).map((e, i) => (
                <li key={ i }>
                  <label
                    data-testid={ `${i}-ingredient-step` }
                    htmlFor={ `${i}-ingredient-name-and-measure` }
                    className={ allCheckboxes && allCheckboxes
                      .includes(`${e} - ${elem[`strMeasure${i + 1}`]}`)
                      ? 'ingredient-checked' : '' }
                  >
                    <input
                      id={ `${i}-ingredient-name-and-measure` }
                      onChange={ handleCheckboxChange }
                      name={ `${e} - ${elem[`strMeasure${i + 1}`]}` }
                      checked={ allCheckboxes && allCheckboxes
                        .includes(`${e} - ${elem[`strMeasure${i + 1}`]}`) }
                      type="checkbox"
                      data-testid={ `${i}-ingredient-name-and-measure` }
                    />
                    {`${e} - ${elem[`strMeasure${i + 1}`]}`}
                  </label>
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
      <button
        data-testid="finish-recipe-btn"
        className="finishRecipe"
        disabled={ allCheckboxes && allCheckboxes.length < quant }
        onClick={ finishRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default MealInProgress;
