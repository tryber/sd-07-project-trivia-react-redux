import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class TelaDeFeedBack extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = md5(email);

    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            alt=""
            src={ `https://www.gravatar.com/avatar/${hash}` }
          />
          <div>
            <p data-testid="header-player-name">{ name }</p>
          </div>
          <div>
            <p data-testid="header-score">{ score }</p>
          </div>
        </header>
        <Link to="/telaDeRanking">
        <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    email: state.gravatarEmail,
    name: state.name,
    score: state.score,
  });
}

TelaDeFeedBack.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(TelaDeFeedBack);
