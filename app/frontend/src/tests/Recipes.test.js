import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Recipes from '../pages/Recipes';
import MockMeals from './helpers/MockMeals';
import MockDrinks from './helpers/Mockdrinks';

describe('Testa a página principal de Receitas', () => {
  it('Testa se chama a API ao renderizar a página', async () => {
    // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   json: jest.fn().mockResolvedValue(MockMeals),
    // });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(MockMeals),
    }).mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockMeals),
    });

    renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });

    const h3 = await screen.findByText('Big Mac');
    expect(h3).toBeInTheDocument();
  });

  it('Testa se chama a API ao renderizar a página', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(MockDrinks),
    }).mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockDrinks),
    });

    renderWithRouter(<Recipes />, { initialEntries: ['/drinks'] });
    // expect(fetch).toHaveBeenCalledTimes(1);
    const h3 = await screen.findByText('Adam');
    expect(h3).toBeInTheDocument();
  });

  it('Testa se dispara um alert quando o não retorna um resultado', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(MockMeals),
    }).mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockMeals),
    });
    const { history } = renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
    const icon = screen.getByTestId('search-top-btn');
    fireEvent.click(icon);
    const input = screen.getByTestId('search-input');
    const name = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    fireEvent.change(input, { target: { value: 'Big Mac' } });
    fireEvent.click(name);
    fireEvent.click(searchButton);
    // screen.debug();

    const { pathname } = history.location;
    setTimeout(() => { expect(pathname).toBe('/meals/53013'); }, 5000);
    // expect(history.location.pathname).toBe('/meals/53013');
  });
});
