import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import PlayGameHeader from '../components/playGameHeader';
import GameBoard from '../components/gameBoard';
import { fetchAPI } from '../action';

class PlayGame extends React.Component {
  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  render() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    return (
      <>
        <GameBoard />
        <PlayGameHeader />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    getToken: () => dispatch(fetchAPI()),
  });

const mapStateToProps = ({ userReducer: { apiToken: { token } } }) => ({
  token,
});

PlayGame.propTypes = {
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
