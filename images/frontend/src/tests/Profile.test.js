import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

describe('Profile test', () => {
  const mockId = 'user';
  const mockEmail = 'teste@teste.com';

  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage(mockId, mockEmail);

  test('Testa se o e-mail é renderizado corretamente', () => {
    const { getByTestId } = renderWithRouter(<Profile />, {}, '/profile');
    const email = getByTestId('profile-email');
    expect(email.textContent).toBe(`Email: ${mockEmail}`);
  });

  test('Testa se ao clicar no botão receitas feitas é redirecionado ao /done-récipes', () => {
    const { history } = renderWithRouter(<Profile />, { initialEntries: ['/drinks'] });
    const profile = screen.getByTestId('profile-done-btn');

    userEvent.click(profile);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testa se ao clicar no botão receitas feitas é redirecionado ao /favorite-recipes', () => {
    const { history } = renderWithRouter(<Profile />, { initialEntries: ['/drinks'] });
    const favorite = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se ao clicar no botão receitas feitas é redirecionado ao /favorite-recipes', () => {
    const { history } = renderWithRouter(<Profile />, { initialEntries: ['/drinks'] });
    const logout = screen.getByTestId('profile-logout-btn');

    userEvent.click(logout);
    expect(history.location.pathname).toBe('/');
  });
});
