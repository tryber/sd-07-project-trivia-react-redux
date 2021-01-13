import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchQuestions from '../services/questionsApi';
import Timer from '../components/Timer';
import Questions from '../components/Questions';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.requestQuestions = this.requestQuestions.bind(this);
    this.disable = this.disable.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = {
      urlImg: '',
      placar: 0,
      questions: { results: [] },
      position: 0,
      disabled: false,
      replyConfirmation: false,
      clicked: false,
    };
  }

  componentDidMount() {
    const cinco = 5;
    const { tokenValue } = this.props;
    this.fetchGravatar();
    this.requestQuestions(cinco, tokenValue);
  }

  async requestQuestions(number, token) {
    this.setState({
      questions: await fetchQuestions(number, token),
    });
    console.log('funcaçao');
  }

  fetchGravatar() {
    const { emailSave } = this.props;
    const hash = md5(emailSave);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      urlImg: url,
    });
  }

  clickHandler() {
    this.setState({
      replyConfirmation: true,

      clicked: true,

    });
  }

  nextQuestion() {
    const { position } = this.state;
    this.setState({
      position: position + 1,
      replyConfirmation: false,
      clicked: false,
    });
  }

  disable() {
    this.setState({ disabled: true });
  }

  render() {
    const { emailSave, nameSave } = this.props;
    const {
      urlImg,
      placar,
      questions,
      position,
      replyConfirmation,
      clicked,
      disabled } = this.state;

    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{nameSave}</h1>

          <h2>{emailSave}</h2>
          <h2 data-testid="header-score">{placar}</h2>
          <img data-testid="header-profile-picture" src={ urlImg } alt="Gravatar" />

        </header>
        <h1 data-testid="settings-title">Trivia!</h1>
        <section>
          <Questions
            clicked={ clicked }
            disabled={ disabled }
            position={ position }
            questions={ questions }
            clickHandler={ this.clickHandler }
          />
          <button
            data-testid="btn-next"
            hidden={ replyConfirmation ? '' : 'hidden' }
            onClick={ this.nextQuestion }
            type="button"
          >
            Próxima
          </button>
        </section>
        <Timer disable={ this.disable } />
      </div>
    );
  }
}

Trivia.propTypes = {
  emailSave: PropTypes.string.isRequired,
  nameSave: PropTypes.string.isRequired,
  tokenValue: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailSave: state.infoPlayer.emailPlayer,
  nameSave: state.infoPlayer.namePlayer,
  tokenValue: state.token.token,
});

export default connect(mapStateToProps)(Trivia);
