import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FetchMealsProvider from './context/FetchMealsContext';
import FetchDrinksProvider from './context/FetchDrinksContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <FetchDrinksProvider>
      <FetchMealsProvider>
        <App />
      </FetchMealsProvider>
    </FetchDrinksProvider>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
