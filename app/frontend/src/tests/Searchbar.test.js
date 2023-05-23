import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import SearchIcon from '../components/SearchIcon';

const oneChar = 'Your search must at least (one) character';
const searchInput = 'search-input';
const buttonSearch = 'exec-search-btn';
const searchIcon = 'search-top-btn';
const radioIngredient = 'ingredient-search-radio';
const radioNameSearch = 'name-search-radio';
const radioFirstLetterSearch = 'first-letter-search-radio';

describe('Testa o componente Search Bar', () => {
  it('Testa se o componente possui um elemento de search input', () => {
    renderWithRouter(<SearchIcon />, { initialEntries: ['/meals'] });
    const icon = screen.getByTestId(searchIcon);
    fireEvent.click(icon);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
  });

  it('Testa se o componente possui três elementos de radio input', () => {
    renderWithRouter(<SearchIcon />, { initialEntries: ['/meals'] });
    const icon = screen.getByTestId(searchIcon);
    fireEvent.click(icon);
    const ingredient = screen.getByTestId(radioIngredient);
    const name = screen.getByTestId(radioNameSearch);
    const firstletter = screen.getByTestId(radioFirstLetterSearch);
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstletter).toBeInTheDocument();
  });

  it('Testa se o componente possui um botão de Buscar', () => {
    renderWithRouter(<SearchIcon />, { initialEntries: ['/meals'] });
    const icon = screen.getByTestId(searchIcon);
    fireEvent.click(icon);
    const search = screen.getByTestId(buttonSearch);
    expect(search).toBeInTheDocument();
  });

  it('Testa se dispara um alert quando a pesquisa é pela primeira letra, mas há mais de uma letra no input', async () => {
    global.alert = jest.fn();
    renderWithRouter(<SearchIcon />, { initialEntries: ['/meals'] });
    const icon = screen.getByTestId(searchIcon);
    fireEvent.click(icon);

    const input = screen.getByTestId(searchInput);
    const firstLetter = screen.getByTestId(radioFirstLetterSearch);
    const searchButton = screen.getByTestId(buttonSearch);
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.click(firstLetter);
    fireEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    );
  });

  test('Testa se dispara um alert quando o input de nome está vazio', async () => {
    global.alert = jest.fn();
    renderWithRouter(<SearchIcon />, { initialEntries: ['/meals'] });
    const icon = screen.getByTestId(searchIcon);
    fireEvent.click(icon);
    const input = screen.getByTestId(searchInput);
    const name = screen.getByTestId(radioNameSearch);
    const searchButton = screen.getByTestId(buttonSearch);

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(name);
    fireEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith(oneChar);
  });

  it('Testa se dispara um alert quando o input de ingrediente está vazio', async () => {
    global.alert = jest.fn();
    renderWithRouter(<SearchIcon />, { initialEntries: ['/meals'] });
    const icon = screen.getByTestId(searchIcon);
    fireEvent.click(icon);
    const input = screen.getByTestId(searchInput);
    const ingredient = screen.getByTestId(radioIngredient);
    const searchButton = screen.getByTestId(buttonSearch);

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(ingredient);
    fireEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith(oneChar);
  });

  it('Testa se a renderiza os botoes vindo da página /drinks', async () => {
    renderWithRouter(<SearchIcon />, { initialEntries: ['/drinks'] });
    const icon = screen.getByTestId(searchIcon);
    fireEvent.click(icon);
    const input = screen.getByTestId(searchInput);
    const ingredient = screen.getByTestId(radioIngredient);
    const searchButton = screen.getByTestId(buttonSearch);

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(ingredient);
    fireEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith(oneChar);
  });

  it('Testa se a renderiza os botoes vindo da página /drinks', async () => {
    renderWithRouter(<SearchIcon />, { initialEntries: ['/drinks'] });
    const icon = screen.getByTestId(searchIcon);
    fireEvent.click(icon);

    const input = screen.getByTestId(searchInput);
    const firstLetter = screen.getByTestId(radioFirstLetterSearch);
    const searchButton = screen.getByTestId(buttonSearch);
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.click(firstLetter);
    fireEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    );
  });
});
