import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Header extends React.Component {
  render() {
    const { gravatar } = this.props;
    const { hashData } = gravatar;
    const getStateSaved = JSON.parse(localStorage.getItem('state'));
    const { score, name } = getStateSaved.player;
    return (
      <div className="header">
        <h1><img src={ Image } alt="logo" className="logo" /></h1>
        <div className="avatar">
          <img
            src={ hashData }
            alt="profile-player"
            data-testid="header-profile-picture"
          />
        </div>
        <h3 data-testid="header-player-name" className="player">{ name }</h3>
        <span data-testid="header-score" className="score">{ score }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.gravatar,
});

Header.propTypes = {
  gravatar: PropTypes.shape({
    hashData: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
