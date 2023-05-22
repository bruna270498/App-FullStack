import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import PageTitle from './PageTitle';
import SearchIcon from './SearchIcon';

function Header() {
  const location = useLocation().pathname;
  const path = location.substring(1);
  const history = useHistory();

  const withoutSearch = ['/profile', '/done-recipes', '/favorite-recipes'];

  const capitalizeFirstLetter = (string) => {
    const espaces = string.replace('-', ' ');
    const array = espaces.split(' ');
    for (let i = 0; i < array.length; i += 1) {
      let a = array[i];

      const firstLetter = a[0];
      a = firstLetter.toUpperCase() + a.slice(1);

      array[i] = a;
    }
    return array.join(' ');
  };

  return (
    <div>
      <PageTitle title={ capitalizeFirstLetter(path) } />
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="icone de perfil" />
      </button>
      { !withoutSearch.includes(location) && <SearchIcon /> }
    </div>
  );
}

export default Header;
