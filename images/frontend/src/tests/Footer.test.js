import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

const drinksIcon = 'drinks-bottom-btn';
const mealsIcon = 'meals-bottom-btn';

describe('Testa se ao clicar no icone de Drinks, é redirecionado a página de drinks', () => {
  it('Testa se o Header possui um elemento Title', () => {
    const { history } = renderWithRouter(<Footer />, { initialEntries: ['/meals'] });
    const drinksButton = screen.getByTestId(drinksIcon);

    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
  });

  it('Testa se ao clicar no icone de Meals, é redirecionado a página de meals', () => {
    const { history } = renderWithRouter(<Footer />, { initialEntries: ['/drinks'] });
    const mealsButton = screen.getByTestId(mealsIcon);

    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
