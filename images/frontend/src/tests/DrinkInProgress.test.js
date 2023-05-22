import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import drinks from './helpers/AdamDrink';
import RecipeInProgress from '../pages/RecipeInProgress';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';

describe('Teste da tela DrinkInProgress', () => {
  const DRINKSPATH = '/drinks/178319/in-progress';
  const SHAREBTNID = 'share-btn';
  const FAVBTNIMG = 'favorite-btn';
  const PHOTOID = 'recipe-photo';
  const NAMEID = 'recipe-title';
  const INGREDIENTID0 = '0-ingredient-step';
  const INGREDIENTID1 = '1-ingredient-step';
  const INGREDIENTID2 = '2-ingredient-step';
  const INSTRUCTIONID = 'instructions';
  const FINISHBTNID = 'finish-recipe-btn';

  it('Verifica se os itens são renderizados na tela', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });
    });

    const { history } = renderWithRouter(<RecipeInProgress />, { initialEntries:
      [DRINKSPATH] });
    act(() => history.push(DRINKSPATH));
    expect(history.location.pathname).toBe(DRINKSPATH);

    const shareBtn = await screen.findByTestId(SHAREBTNID);
    const photo = await screen.findByTestId(PHOTOID);
    const name = await screen.findByTestId(NAMEID);
    const ingredient0 = await screen.findByTestId(INGREDIENTID0);
    const ingredient1 = await screen.findByTestId(INGREDIENTID1);
    const ingredient2 = await screen.findByTestId(INGREDIENTID2);
    const instructions = await screen.findByTestId(INSTRUCTIONID);
    const finishBtn = await screen.findByTestId(FINISHBTNID);

    expect(shareBtn).toBeEnabled();
    expect(photo.src).toBe('https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg');
    expect(name).toHaveTextContent('Adam');
    expect(ingredient0).toHaveTextContent('Dark rum');
    expect(ingredient1).toHaveTextContent('Lemon juice');
    expect(ingredient2).toHaveTextContent('Grenadine');
    expect(instructions).toHaveTextContent('In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.');
    expect(finishBtn).toHaveTextContent('Finish Recipe');
    expect(finishBtn).toBeDisabled();
    expect(ingredient0).not.toBeChecked();
  });

  it('Verifica botão de compartilhar e favoritar', async () => {
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
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });
    });

    const { history } = renderWithRouter(<RecipeInProgress />, { initialEntries:
      [DRINKSPATH] });
    act(() => history.push(DRINKSPATH));
    expect(history.location.pathname).toBe(DRINKSPATH);

    const shareBtn = await screen.findByTestId(SHAREBTNID);
    const favoriteBtn = await screen.findByTestId(FAVBTNIMG);

    act(() => {
      userEvent.click(shareBtn);
      userEvent.click(favoriteBtn);
    });

    // expect(btnFavorite.src).toBe(blackHeartIcon);

    screen.getByText(/link copied!/i);

    act(() => {
      userEvent.click(favoriteBtn);
    });

    // expect(btnFavorite.src).toBe(whiteHeartIcon);
  });

  it('Verifica check dos ingredientes e botão finalizar receita', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });
    });

    const { history } = renderWithRouter(<RecipeInProgress />, { initialEntries:
      [DRINKSPATH] });
    act(() => history.push(DRINKSPATH));
    expect(history.location.pathname).toBe(DRINKSPATH);

    const ingredient0 = await screen.findByTestId(INGREDIENTID0);
    const ingredient1 = await screen.findByTestId(INGREDIENTID1);
    const ingredient2 = await screen.findByTestId(INGREDIENTID2);
    const finishBtn = await screen.findByTestId(FINISHBTNID);

    expect(ingredient0).not.toHaveClass();

    act(() => {
      userEvent.click(ingredient0);
      userEvent.click(ingredient1);
      userEvent.click(ingredient2);
    });

    const ingredient3Checked = await screen.findByRole('checkbox', { name: /1 tsp/i });
    expect(ingredient3Checked).toBeChecked();
    expect(ingredient0).toHaveClass('ingredient-checked');
    expect(finishBtn).toBeEnabled();

    act(() => {
      userEvent.click(finishBtn);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
