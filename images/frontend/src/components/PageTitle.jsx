import PropTypes from 'prop-types';
import React from 'react';

function PageTitle({ title }) {
  return (
    <div
      data-testid="page-title"
    >
      { title }
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
