import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomHeader, CustomGame, CustomNextButton } from '../components';
import { getStorage } from '../services/localStorage';
import { fetchTrivia } from '../actions';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      count: 0,
      stopTimer: false,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeCount = this.changeCount.bind(this);
  }

  componentDidMount() {
    const { dispatchTrivia } = this.props;
    dispatchTrivia(getStorage('token'));
  }

  submitAnswer() {
    // this.changeSstyles();
    this.setState({ answered: true, stopTimer: true });
  }

  changeCount() {
    const { count } = this.state;
    this.setState({ count: count + 1, answered: false });
  }

  render() {
    const { name, email, trivia, loading } = this.props;
    const { answered, count, stopTimer } = this.state;
    return (
      <div>
        <CustomHeader name={ name } email={ email } />
        {loading && <p>...Loading</p>}

        {trivia.length > 0 && (
          <div>
            <CustomGame
              changeStyle={ answered }
              index={ count }
              challenge={ trivia }
              correct={ this.submitAnswer }
              stopTimer={ stopTimer }
            />
          </div>
        )}
        {answered && <CustomNextButton next={ this.changeCount } />}
      </div>
    );
  }
}
const mapStateToProps = ({
  loginReducer: { name, email },
  triviaReducer: { trivia, loading },
  tokenReducer: { loadingToken },
}) => ({
  name,
  email,
  trivia,
  loading,
  loadingToken,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (a) => dispatch(fetchTrivia(a)),
});

GameScreen.propTypes = {
  dispatchTrivia: PropTypes.func.isRequired,
  trivia: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
