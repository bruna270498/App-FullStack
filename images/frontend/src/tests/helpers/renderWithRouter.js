import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import FetchMealsProvider from '../../context/FetchMealsContext';
import FetchDrinksProvider from '../../context/FetchDrinksContext';

export function withRouter(component, history) {
  return (
    <FetchDrinksProvider>
      <FetchMealsProvider>
        <Router history={ history }>
          { component }
        </Router>
      </FetchMealsProvider>
    </FetchDrinksProvider>
  );
}

export default function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
