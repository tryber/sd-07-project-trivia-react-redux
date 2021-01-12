import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Title extends Component {
  render() {
    const { title, subTitle, dataTestid } = this.props;
    return (
      <div className="title-container">
        <h1 className="title-h1" data-testid={ dataTestid }>{ title }</h1>
        {(subTitle) && <h2 className="title-h2">{ subTitle }</h2>}
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  dataTestid: PropTypes.string,
};

Title.defaultProps = {
  subTitle: '',
  dataTestid: '',
};

export default Title;
