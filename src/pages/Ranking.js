import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { email, name, points, history } = this.props;
    const hashEmail = md5(email);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <div>
          <img
            className="gamer-avatar"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="avatar"
          />
        </div>
        <div>
          <h3 data-testid="header-player-name">{name}</h3>
        </div>
        <div>
          <h3 data-testid="header-score">{ points }</h3>
        </div>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.token.email,
  name: state.token.name,
  points: state.token.points,
});

Ranking.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Ranking);
