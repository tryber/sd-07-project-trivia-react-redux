import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, QuestionsList } from '../../components';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      count: 30,
    };
    this.timer = 0;
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
    const { name, email: gravatarEmail } = this.props;
    const plyrObjct = { player: { name, gravatarEmail, score: 0, assertions: 0 } };

    localStorage.setItem('state', JSON.stringify(plyrObjct));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    const oneSecond = 1000;
    this.timer = setInterval(() => {
      this.setState((prev) => ({ count: prev.count - 1 }));
    }, oneSecond);
  }

  resetTimer() {
    this.setState({ count: 30 }, () => this.startTimer());
  }

  stopTimer() {
    const { count } = this.state;
    clearInterval(this.timer);
    this.setState({ count: count === 0 ? 'Tempo!' : count });
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <Header />
        <QuestionsList
          count={ count }
          stopTimer={ this.stopTimer }
          resetTimer={ this.resetTimer }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
