import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomHeader, CustomGame } from '../components';
import { getStorage } from '../services/localStorage';
import { fetchTrivia } from '../actions';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      // magicButton: false,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    // this.changeIndex = this.changeIndex.bind(this);
  }

  componentDidMount() {
    const { dispatchTrivia } = this.props;
    dispatchTrivia(getStorage('token'));
  }

  submitAnswer() {
    // this.setState({ magicButton: true });
  }

  render() {
    const { name, email, trivia, loading } = this.props;
    return (
      <div>
        <CustomHeader name={ name } email={ email } />
        { loading && (
          <p>...Loading</p>
        ) }
        { trivia.length > 0
          && <CustomGame challenge={ trivia } correct={ this.submitAnswer } />}
      </div>
    );
  }
}
const mapStateToProps = ({
  loginReducer: { name, email },
  triviaReducer: { trivia, loading },
}) => ({
  name,
  email,
  trivia,
  loading,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (a) => dispatch(fetchTrivia(a)),
});

GameScreen.propTypes = {
  dispatchTrivia: PropTypes.func.isRequired,
  trivia: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
