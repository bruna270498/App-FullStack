import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import AdamDrink from './helpers/AdamDrink';
import mockMeals from './helpers/MockMeals';
import RecipeDetails from '../pages/RecipeDetails';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';

describe('Teste da rota "/meals-details"', () => {
  const DRINKPATH = '/drinks/17837';

  it('Verifica se os elementos são renderizados corretamente', async () => {
    act(() => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(AdamDrink),
      });
    });

    const { history } = renderWithRouter(<RecipeDetails />, { initialEntries:
      [DRINKPATH] });
    expect(history.location.pathname).toBe(DRINKPATH);

    const recipePhoto = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const ingredient1 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('2-ingredient-name-and-measure');
    const instruction = await screen.findByTestId('instructions');
    const btnStart = await screen.findByTestId('start-recipe-btn');
    const btnShare = await screen.findByTestId('share-btn');

    expect(recipePhoto.src).toBe('https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg');
    expect(recipeTitle).toHaveTextContent('Adam');
    expect(recipeCategory).toHaveTextContent('Alcoholic');
    expect(ingredient1).toHaveTextContent('Dark rum - 2 oz');
    expect(ingredient2).toHaveTextContent('Lemon juice - 1 oz');
    expect(ingredient3).toHaveTextContent('Grenadine - 1 tsp');
    expect(instruction).toHaveTextContent('In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.');
    expect(btnStart).toHaveTextContent('Start Recipe');
    expect(btnShare).toBeInTheDocument();
  });

  it('verfica a funcionalidade do botão favorite', async () => {
    act(() => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(AdamDrink),
      });
    });

    const { history } = renderWithRouter(<RecipeDetails />, { initialEntries:
      [DRINKPATH] });
    expect(history.location.pathname).toBe(DRINKPATH);

    const btnFavorite = await screen.findByTestId('favorite-btn');

    act(() => {
      userEvent.click(btnFavorite);
    });

    // expect(btnFavorite.src).toBe(blackHeartIcon);

    act(() => {
      userEvent.click(btnFavorite);
    });

    // expect(btnFavorite.src).toBe(whiteHeartIcon);
  });

  it('Verifica botão Continue Recipe', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        drinks: {
          17837: ['bla'],
        },
      },
    ));

    act(() => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(AdamDrink),
      });
    });

    const { history } = renderWithRouter(<RecipeDetails />, { initialEntries:
      [DRINKPATH] });
    expect(history.location.pathname).toBe(DRINKPATH);

    const continueRecipe = await screen.findByTestId('start-recipe-btn');
    expect(continueRecipe).toHaveTextContent('Continue Recipe');
  });

  it('verifica link de copiar', async () => {
    let clipboardData = '';
    const mockClipboard = {
      writeText: jest.fn(
        (data) => { clipboardData = data; },
      ),
      readText: jest.fn(
        () => clipboardData,
      ),
    };
    global.navigator.clipboard = mockClipboard;

    act(() => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(AdamDrink),
      });
    });

    const { history } = renderWithRouter(<RecipeDetails />, { initialEntries:
      [DRINKPATH] });
    expect(history.location.pathname).toBe(DRINKPATH);

    const btnShare = await screen.findByTestId('share-btn');

    act(() => {
      userEvent.click(btnShare);
    });

    const linkShared = await screen.findByText(/link copied!/i);
    expect(linkShared).toBeInTheDocument();
  });
});
