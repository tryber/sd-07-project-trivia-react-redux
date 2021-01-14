import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.messagePlayer = this.messagePlayer.bind(this);
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

  messagePlayer() {
    const state = JSON.parse(localStorage.getItem('state'));
    const tres = 3;
    const { player } = state;
    const { assertions } = player;
    if (assertions >= tres) {
      return 'Mandou bem!';
    }
    return 'Podia ser melhor...';
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const { score, assertions } = player;
    const { emailSave, nameSave } = this.props;
    const { urlImg } = this.state;
    console.log(urlImg);
    return (

      <div>
        <header>
          <h1 data-testid="feedback-text">FeedBack</h1>
          <h1 data-testid="header-player-name">{nameSave}</h1>
          <h2>{emailSave}</h2>
          <h2 data-testid="header-score">{score}</h2>
          <p data-testid="feedback-text">{this.messagePlayer()}</p>
          <img data-testid="header-profile-picture" src={ urlImg } alt="Gravatar" />

        </header>
        <section>
          <h3 data-testid="feedback-total-score">{score}</h3>
          <h3 data-testid="feedback-total-question">{assertions}</h3>
        </section>
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
