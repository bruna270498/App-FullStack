import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../components/Header';

const profile = 'profile-top-btn';

describe('Testa o componente Header', () => {
  it('Testa se o Header possui um elemento Title', () => {
    renderWithRouter(<Header />, { initialEntries: ['/meals'] });

    const titleElement = screen.getByTestId('page-title');
    expect(titleElement).toBeInTheDocument();
  });

  it('Testa se o Header possui uma imagem com o ícone do perfil', () => {
    renderWithRouter(<Header />, { initialEntries: ['/meals'] });

    const profileIcon = screen.getByTestId(profile);
    expect(profileIcon).toBeInTheDocument();
  });

  it('Testa se o Header possui um elemento de pesquisa', () => {
    renderWithRouter(<Header />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(profile);
    expect(searchIcon).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão do ícone de perfil, é redirecionado à pagína de Perfil', () => {
    const { history } = renderWithRouter(<Header />, { initialEntries: ['/meals'] });

    const profileIcon = screen.getByTestId(profile);
    expect(profileIcon).toBeInTheDocument();

    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});
