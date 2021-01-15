import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class PlayGameHeader extends Component {
  render() {
    const { email, username, results } = this.props;
    console.log(results);
    return (
      <header className="playGame">
        <div className="img">
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email)}` }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        <div className="userName">
          <span data-testid="header-player-name">{ username }</span>
        </div>
        <div className="score">
          <span>Pontuação:</span>
          <span id="score" data-testid="header-score">0</span>
        </div>
        {/* <div data-testid="question-category">{Object.results}</div> */}
      </header>
    );
  }
}

const mapStateToProps = ({ userReducer: { user: { email, username } }, gameReducer: { apiData: { results } } }) => ({
  email,
  username,
  results,
});

PlayGameHeader.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(PlayGameHeader);
