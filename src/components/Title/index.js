import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Title extends Component {
  render() {
    const { title, subTitle1, subTitle2, dataTestid } = this.props;
    return (
      <div className="title-container">
        <h1 className="title-h1" data-testid={ dataTestid }>{ title }</h1>
        {(subTitle1) && <span className="title-h2">{ subTitle1 }</span>}
        {(subTitle2) && <span className="title-h2">{ subTitle2 }</span>}
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle1: PropTypes.string,
  subTitle2: PropTypes.string,
  dataTestid: PropTypes.string,
};

Title.defaultProps = {
  subTitle1: '',
  subTitle2: '',
  dataTestid: '',
};

export default Title;
