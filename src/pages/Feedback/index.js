import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Title, Header } from '../../components';
import { getStorage } from '../../services';
import './style.css';

class Feedback extends Component {
  contentHeader() {
    const { assertions, score } = getStorage('player');
    const min = 3;
    let title = '';
    if (assertions >= min) {
      title = 'Mandou bem!';
    } else {
      title = 'Podia ser melhor...';
    }
    return (
      <div className="feed-content-child feed-header">
        <div className="feed-flex-basis-corners" />
        <div className="feed-flex-basis-center">
          <Title
            title={ title }
            dataTestid="feedback-text"
            subTitle1={ `Você acertou ${assertions} questões!` }
            dataTestid1="feedback-total-question"
            subTitle2={ `Um total de ${score} pontos` }
            dataTestid2="feedback-total-score"
          />
        </div>
      </div>
    );
  }

  contentFooter() {
    return (
      <div className="feed-buttons-container">
        <Link to="ranking">
          <button
            className="feed-button-ranking"
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            className="feed-button-again"
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="feed-container">
        <Header />
        <div className="feed-content">
          <div className="feed-header">
            {this.contentHeader()}
          </div>
          <div className="feed-footer">
            {this.contentFooter()}
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;
