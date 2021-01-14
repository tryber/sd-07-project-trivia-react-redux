import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Title, Header } from '../../components';
import './style.css';

class Feedback extends Component {
  render() {
    const rightAnswer = 2;
    const min = 3;
    return (
      <div>
        <Header />
        {
          (rightAnswer >= min)
            ? (
              <Title
                title="Mandou bem!"
                subTitle1="Você acertou 5 questões!"
                subTitle2="Um total de 50 pontos"
                data-testid="feedback-text"
              />
            ) : (
              <Title
                title="Podia ser melhor..."
                subTitle1="Você acertou 5 questões!"
                subTitle2="Um total de 50 pontos"
                data-testid="feedback-text"
              />
            )
        }
        <Link to="ranking">
          <button type="button">Ver Ranking</button>
        </Link>
        <Link to="/">
          <button type="button">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
