import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePicture } from '../redux/actions';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.gravatarHash = this.gravatarHash.bind(this);
  }

  gravatarHash() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail);
    return hash;
  }

  render() {
    const { name, score, savePic } = this.props;
    const urlPicture = `https://www.gravatar.com/avatar/${this.gravatarHash()}`;
    savePic(urlPicture);

    return (
      <div className="header">
        {/* <div className="name-and-pic"> */}
        <img
          data-testid="header-profile-picture"
          src={ urlPicture }
          className="profile-picture"
          height="100%"
          alt="Avatar"
        />
        <p data-testid="header-player-name" className="header-player-name">{ name }</p>
        {/* </div> */}
        <p data-testid="header-score" className="header-score">
          { score }
          {' '}
          points
        </p>
      </div>

    );
  }
}

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name,
  gravatarEmail,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  savePic: (info) => dispatch(savePicture(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  savePic: PropTypes.func.isRequired,
};
