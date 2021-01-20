import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './trivia.png';
import './App.css';
import Login from './components/login';

class App extends React.Component {
  componentDidMount() {
    localStorage.setItem('state', JSON.stringify({ player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    } }));
  }

  render() {
    const { history } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Login />
          <button
            onClick={ () => history.push('./config') }
            type="button"
            to="/config"
            data-testid="btn-settings"
          >
            ⚙
          </button>
        </header>
      </div>
    );
  }
}

export default withRouter(App);

App.propTypes = {
  history: PropTypes.objectOf().isRequired,
};
