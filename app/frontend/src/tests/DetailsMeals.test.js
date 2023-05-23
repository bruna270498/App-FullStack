import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import mockDrinks from './helpers/Mockdrinks';
import meal from './helpers/ArrabiataMeal';
import RecipeDetails from '../pages/RecipeDetails';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';

describe('Teste da rota "/meals-details"', () => {
  const MEALPATH = '/meals/52771';

  it('Verifica se os elementos são renderizados corretamente', async () => {
    act(() => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockDrinks),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(meal),
      });
    });

    const { history } = renderWithRouter(<RecipeDetails />, { initialEntries:
      [MEALPATH] });
    expect(history.location.pathname).toBe(MEALPATH);

    const recipePhoto = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const ingredient1 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('2-ingredient-name-and-measure');
    const ingredient4 = await screen.findByTestId('3-ingredient-name-and-measure');
    const ingredient5 = await screen.findByTestId('4-ingredient-name-and-measure');
    const ingredient6 = await screen.findByTestId('5-ingredient-name-and-measure');
    const ingredient7 = await screen.findByTestId('6-ingredient-name-and-measure');
    const ingredient8 = await screen.findByTestId('7-ingredient-name-and-measure');
    const instruction = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const btnStart = await screen.findByTestId('start-recipe-btn');
    const btnShare = await screen.findByTestId('share-btn');
    // const btnFavorite = await screen.findByTestId('favorite-btn');

    expect(recipePhoto.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(recipeTitle).toHaveTextContent('Spicy Arrabiata Penne');
    expect(recipeCategory).toHaveTextContent('Vegetarian');
    expect(ingredient1).toHaveTextContent('penne rigate - 1 pound');
    expect(ingredient2).toHaveTextContent('olive oil - 1/4 cup');
    expect(ingredient3).toHaveTextContent('garlic - 3 cloves');
    expect(ingredient4).toHaveTextContent('chopped tomatoes - 1 tin');
    expect(ingredient5).toHaveTextContent('red chile flakes - 1/2 teaspoon');
    expect(ingredient6).toHaveTextContent('italian seasoning - 1/2 teaspoon');
    expect(ingredient7).toHaveTextContent('basil - 6 leaves');
    expect(ingredient8).toHaveTextContent('Parmigiano-Reggiano - spinkling');
    expect(instruction).toHaveTextContent('Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.');
    expect(video.src).toBe('https://www.youtube.com/embed/1IszT_guI08');
    expect(btnStart).toHaveTextContent('Start Recipe');
    expect(btnShare).toBeInTheDocument();
    // expect(btnFavorite.src).toBe(whiteHeartIcon);
  });

  it('verfica a funcionalidade do botão favorite', async () => {
    act(() => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockDrinks),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(meal),
      });
    });

    const { history } = renderWithRouter(<RecipeDetails />, { initialEntries:
      [MEALPATH] });
    expect(history.location.pathname).toBe(MEALPATH);
    screen.debug();

    const btnFavorite = await screen.findByTestId('favorite-btn');

    act(() => {
      userEvent.click(btnFavorite);
    });

    // expect(btnFavorite.src).toBe(blackHeartIcon.svg);

    act(() => {
      userEvent.click(btnFavorite);
    });

    // expect(btnFavorite.src).toBe(whiteHeartIcon.svg);
  });

  it('Verifica botão Continue Recipe', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        meals: {
          52771: ['bla'],
        },
      },
    ));

    act(() => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockDrinks),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(meal),
      });
    });

    const { history } = renderWithRouter(<RecipeDetails />, { initialEntries:
      [MEALPATH] });
    expect(history.location.pathname).toBe(MEALPATH);

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
        json: jest.fn().mockResolvedValue(mockDrinks),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(meal),
      });
    });

    const { history } = renderWithRouter(<RecipeDetails />, { initialEntries:
      [MEALPATH] });
    expect(history.location.pathname).toBe(MEALPATH);

    const btnShare = await screen.findByTestId('share-btn');

    act(() => {
      userEvent.click(btnShare);
    });

    const linkShared = await screen.findByText(/link copied!/i);
    expect(linkShared).toBeInTheDocument();
  });
});
