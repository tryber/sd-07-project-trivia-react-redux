import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';


class Header extends Component {
 
  render() {
    const { info } = this.props;
    const { imageSrc, name, score } = info;
    return (
      <header>
        <div className="avatar-container">
          <img
            src={ imageSrc }
            alt={ name }
            data-testid="header-profile-picture"
          />
        </div>
        <div className="name-container">
          <p data-testid="header-player-name">
            { name }
          </p>
        </div>
        <div className="score-container">
          <p data-testid="header-score">
            { `Seu Score: ${score}` }
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  info: state.player,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  src: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
}.isRequired;
