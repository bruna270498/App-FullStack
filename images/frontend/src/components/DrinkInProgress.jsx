import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FetchDrinksContext } from '../context/FetchDrinksContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../App.css';

function DrinkInProgress() {
  const [clickedShare, setClickedShare] = useState(false);
  const [allCheckboxes, setAllCheckboxes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { detailsDrinks, fetchDetailsDrinks } = useContext(FetchDrinksContext);
  const history = useHistory();
  const { id } = useParams();
  let quant = 0;

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchDetailsDrinks(id);
    };
    fetchAPI();
    const obj = {
      drinks: {
        [id]: allCheckboxes,
      },
    };
    const type = 'drinks';
    if (localStorage.inProgressRecipes) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ids = Object.keys(inProgressRecipes.drinks ? inProgressRecipes.drinks : obj);
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
    const inProgressRecipesType = inProgressRecipes.drinks;
    inProgressRecipes.drinks = { ...inProgressRecipesType, [id]: allCheckboxes };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [allCheckboxes]);

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    doneRecipes.push({
      id,
      type: 'drink',
      nationality: '',
      category: detailsDrinks[0].strCategory,
      alcoholicOrNot: detailsDrinks[0].strAlcoholic,
      name: detailsDrinks[0].strDrink,
      image: detailsDrinks[0].strDrinkThumb,
      doneDate: new Date(),
      tags: [],
    });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
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

  const handleCheckboxChange = ({ target }) => {
    if (allCheckboxes.includes(target.name)) {
      const newCheckboxes = allCheckboxes.filter((e) => e !== target.name);
      setAllCheckboxes(newCheckboxes);
    } else {
      setAllCheckboxes([...allCheckboxes, target.name]);
    }
  };

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
                alt={ elem.strDrink }
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

export default DrinkInProgress;
