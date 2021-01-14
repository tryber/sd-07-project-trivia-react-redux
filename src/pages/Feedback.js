import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlImg: '',
    };
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  fetchGravatar() {
    const { emailSave } = this.props;
    const hash = md5(emailSave);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      urlImg: url,
    });
  }

  jogarNovamente() {
    const { history } = this.props;

    history.push('/');
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const { score } = player;
    const { emailSave, nameSave } = this.props;
    const { urlImg } = this.state;
    console.log(urlImg);
    return (

      <div>
        <header>
          <h1 data-testid="header-player-name">{nameSave}</h1>
          <h2>{emailSave}</h2>
          <h2 data-testid="header-score">{score}</h2>
          <img data-testid="header-profile-picture" src={ urlImg } alt="Gravatar" />

        </header>
        <h1 data-testid="feedback-text">FeedBack</h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.jogarNovamente() }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

FeedBack.propTypes = {
  emailSave: PropTypes.string.isRequired,
  nameSave: PropTypes.string.isRequired,
  history: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  emailSave: state.infoPlayer.emailPlayer,
  nameSave: state.infoPlayer.namePlayer,
  tokenValue: state.token.token,
});

export default connect(mapStateToProps)(FeedBack);
