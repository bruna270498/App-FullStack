import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const LINT_EH_UM_SACO = '/favorite-recipes';
const mockFavoriteRecipes = [
  {
    id: '53013',
    type: 'meal',
    nationality: 'American',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
  },
  {
    id: '53065',
    type: 'meal',
    nationality: 'Japanese',
    category: 'Seafood',
    alcoholicOrNot: '',
    name: 'Sushi',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
  },
  {
    id: '17837',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Adam',
    image:
      'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
  },
];
const idMock = 'favoriteRecipes';

describe('Testa a página principal de Receitas', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('Testa se ao renderizar os favorites, aparece', async () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    screen.getByText('Big Mac');
  });

  it('Testa se ao clicar no botão de drinks Aparece Big Mac', () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);
    screen.getByText('Big Mac');
  });

  it('Testa se ao clicar no botão de drinks Aparece Adam', () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
    screen.getByText('Adam');
  });

  it('Testa se ao clicar no botão de All Aparece Adam', () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const filterAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAll);
    screen.getByText('Adam');
  });

  it('Testa se ao clicar na receita é redirecionado para a pag dela', () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    const { history } = renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const bigMac = screen.getByRole('img', {
      name: /big mac/i,
    });
    userEvent.click(bigMac);
    expect(history.location.pathname).toBe('/meals/53013');
  });

  it('Testa se ao clicar na receita é redirecionado para a pag dela', () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    const { history } = renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const Adam = screen.getByRole('img', {
      name: /Adam/i,
    });
    userEvent.click(Adam);
    expect(history.location.pathname).toBe('/drinks/17837');
  });

  it('Testa se Adam é alcoolico', () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const alcoolico = screen.getByTestId('1-horizontal-top-text');
    expect(alcoolico).toBeInTheDocument();
  });

  it('Testa se Adam tem um link de compartilhar', () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const button = screen.getByTestId('1-horizontal-favorite-btn');
    expect(button).toBeInTheDocument();
  });

  it('Testa se ao clicar no favoritar o elemento sai do localStorage', () => {
    const ovewritten = [{ id: '53065', type: 'meal', nationality: 'Japanese', category: 'Seafood', alcoholicOrNot: '', name: 'Sushi', image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg' }, { id: '17837', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Alcoholic', name: 'Adam', image: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg' }];
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const favbutton = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favbutton);
    expect(localStorage.getItem(idMock)).toEqual(JSON.stringify(ovewritten));
  });

  it('Testa se o compartilhar é um botao', async () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage(idMock, mockFavoriteRecipes);
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: [LINT_EH_UM_SACO],
    });
    const txt = jest.fn();
    global.navigator.clipboard = { writeText: txt };
    // const txt = jest.spyOn(navigator.clipboard, 'writeText');
    // navigator.clipboard = {
    //   writeText: txt,
    // };
    const button = screen.getByTestId('0-horizontal-share-btn');
    const button2 = screen.getByTestId('2-horizontal-share-btn');
    userEvent.click(button);
    userEvent.click(button2);
    expect(txt).toHaveBeenCalledTimes(2);
  });
});
