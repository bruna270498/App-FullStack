import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import doneList from './helpers/doneList';

const doneRecipeUrl = '/done-recipes';

const IMAGE0 = '0-horizontal-image';
const NAME0 = '0-horizontal-name';
const TOPTEXT0 = '0-horizontal-top-text';
const DONEDATE0 = '0-horizontal-done-date';
const TAG01 = '0-Veg-horizontal-tag';
const TAG02 = '0-Pepper-horizontal-tag';
const IMAGE1 = '1-horizontal-image';
const NAME1 = '1-horizontal-name';
const TOPTEXT1 = '1-horizontal-top-text';
const DONEDATE1 = '1-horizontal-done-date';
const SHAREBTN1 = '1-horizontal-share-btn';

const setLocalStorage = (mockName, mockStorage) => {
  window.localStorage.setItem(mockName, JSON.stringify(mockStorage));
};

describe('Testando a página de DoneRecipes', () => {
  // beforeEach(() => {
  //   localStorage.clear();
  // });
  it('Verifica se a tela de DoneRecipes é renderizada corretamente', () => {
    renderWithRouter(<DoneRecipes />, { initialEntries: [doneRecipeUrl] });

    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });

    expect(buttonAll && buttonMeals && buttonDrinks).toBeInTheDocument();
  });

  it('Verifica se os botões de filtro funcionam corretamente', () => {
    setLocalStorage('doneRecipes', [{
      alcoholicOrNot: '',
      category: 'Side',
      doneDate: '2023-02-02T22:06:41.268Z',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      tags: ['Soup'],
      type: 'meal',
    }]);
    renderWithRouter(<DoneRecipes />, { initialEntries: [doneRecipeUrl] });
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });
    // screen.debug();
    const imgMeal = screen.getByRole('heading', { level: 1, name: /corba/i });

    expect(buttonAll && buttonMeals && buttonDrinks).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(imgMeal).toBeInTheDocument();
    userEvent.click(buttonMeals);
    expect(imgMeal).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    expect(imgMeal).not.toBeInTheDocument();
  });

  it('Verifica se é renderizado na tela Corba e DoneRecipes', async () => {
    setLocalStorage('doneRecipes', [{
      alcoholicOrNot: '',
      category: 'Side',
      doneDate: '2023-02-02T22:06:41.268Z',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      tags: ['Soup'],
      type: 'meal',
    }]);
    renderWithRouter(<DoneRecipes />, { initialEntries: [doneRecipeUrl] });
    expect(screen.getByText('Corba')).toBeInTheDocument();
  });

  it('Redireciona para a página Meals correta', () => {
    setLocalStorage('doneRecipes', [{
      id: '52771',
      type: 'meal',
      nationality: 'Germany',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '31/01/2023',
      tags: ['Veg', 'Pepper'],
    }]);
    const { history } = renderWithRouter(<DoneRecipes />, { initialEntries:
      [doneRecipeUrl] });
    const btn = screen.getByTestId('redirect-btn');
    act(() => {
      userEvent.click(btn);
    });
    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Redireciona para a página Drinks correta', () => {
    setLocalStorage('doneRecipes', [{
      id: '178319',
      type: 'drink',
      nationality: 'Brazilian',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '30/01/2023',
      tags: ['drink'],
    }]);
    const { history } = renderWithRouter(<DoneRecipes />, { initialEntries:
      [doneRecipeUrl] });
    const btn = screen.getByTestId('redirect-btn');
    act(() => {
      userEvent.click(btn);
    });
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('verifica se os elemento são renderizados na tela', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneList));

    renderWithRouter(<DoneRecipes />, { initialEntries: [doneRecipeUrl] });

    const imageMeal = screen.getByTestId(IMAGE0);
    const nameMeal = screen.getByTestId(NAME0);
    const topTextMeal = screen.getByTestId(TOPTEXT0);
    const doneDateMeal = screen.getByTestId(DONEDATE0);
    const tag1Meal = screen.getByTestId(TAG01);
    const tag2Meal = screen.getByTestId(TAG02);
    const imageDrink = screen.getByTestId(IMAGE1);
    const nameDrink = screen.getByTestId(NAME1);
    const topTextDrink = screen.getByTestId(TOPTEXT1);
    const doneDateDrink = screen.getByTestId(DONEDATE1);
    screen.getByTestId(SHAREBTN1);

    expect(imageMeal.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(nameMeal).toHaveTextContent('Spicy Arrabiata Penne');
    expect(topTextMeal).toHaveTextContent('Germany - Vegetarian');
    expect(doneDateMeal).toHaveTextContent('31/01/2023');
    expect(tag1Meal).toHaveTextContent('Veg');
    expect(tag2Meal).toHaveTextContent('Pepper');
    expect(imageDrink.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(nameDrink).toHaveTextContent('Aquamarine');
    expect(topTextDrink).toHaveTextContent('Alcoholic');
    expect(doneDateDrink).toHaveTextContent('30/01/2023');
  });

  it('Verifica botão share', () => {
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
    localStorage.setItem('doneRecipes', JSON.stringify(doneList));
    renderWithRouter(<DoneRecipes />, { initialEntries: [doneRecipeUrl] });
    const btn = screen.getByTestId('0-horizontal-share-btn');
    act(() => {
      userEvent.click(btn);
    });
    screen.getAllByText(/link copied!/i);
  });
});
