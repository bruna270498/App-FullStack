import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const email = localStorage.getItem('user');
  const history = useHistory();

  const handleDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleFavorite = () => {
    history.push('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (

    <div>
      <Header />
      <div className="profile-container">
        <h1>Profile</h1>
        <p data-testid="profile-email">
          Email:
          {email}
        </p>
        <button
          onClick={ () => handleDoneRecipes() }
          data-testid="profile-done-btn"
        >
          Done Recipes

        </button>
        <button
          onClick={ () => handleFavorite() }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          onClick={ () => handleLogout() }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
