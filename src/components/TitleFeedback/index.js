import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class TitleFeedback extends Component {
  render() {
    const {
      title, subTitle1, subTitle2, dataTestid, dataTestid1, dataTestid2,
    } = this.props;
    return (
      <div className="title-container">
        <h1 className="title-h1" data-testid={ dataTestid }>{ title }</h1>
        <div className="title-h2">
          <span>Você acertou &nbsp;</span>
          <span data-testid={ dataTestid1 }>{ subTitle1 }</span>
          <span>&nbsp;questões!</span>
        </div>
        <div className="title-h2">
          <span>Um total de &nbsp;</span>
          <span data-testid={ dataTestid2 }>{ subTitle2 }</span>
          <span>&nbsp;pontos</span>
        </div>
      </div>
    );
  }
}

TitleFeedback.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle1: PropTypes.string,
  subTitle2: PropTypes.string,
  dataTestid: PropTypes.string,
  dataTestid1: PropTypes.string,
  dataTestid2: PropTypes.string,
};

TitleFeedback.defaultProps = {
  subTitle1: '',
  subTitle2: '',
  dataTestid: '',
  dataTestid1: '',
  dataTestid2: '',
};

export default TitleFeedback;
