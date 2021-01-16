import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Title, RankingItem, Next } from '../../components';
import './style.css';

class Ranking extends Component {
  contentHeader() {
    return (
      <div className="ranking-content-child ranking-header">
        <div className="ranking-flex-basis-corners" />
        <div className="ranking-flex-basis-center">
          <Title title="Ranking" dataTestid="ranking-title" />
        </div>
        <div className="ranking-flex-basis-corners" />
      </div>
    );
  }

  contentMain() {
    return (
      <div className="ranking-content-child ranking-main">
        <div className="ranking-flex-basis-corners" />
        <div className="ranking-flex-basis-center">
          <div className="ranking-content-main">
            <RankingItem />
          </div>
        </div>
        <div className="ranking-flex-basis-corners" />
      </div>
    );
  }

  contentFooter() {
    return (
      <div className="ranking-content-child ranking-footer">
        <div className="ranking-flex-basis-corners" />
        <div className="ranking-flex-basis-center">
          <Link to="/">
            <Next dataTestid="btn-go-home" />
          </Link>
        </div>
        <div className="ranking-flex-basis-corners" />
      </div>
    );
  }

  render() {
    return (
      <div className="ranking-container">
        {/* <Header /> */}
        {/* <QuestionCategory /> */}
        <div className="ranking-content">
          {this.contentHeader()}
          {this.contentMain()}
          {this.contentFooter()}
        </div>

      </div>
      // <div>
      //   <Header />
      //   <Title title="Ranking" />
      //   <RankingItem />
      // </div>
    );
  }
}

export default Ranking;
