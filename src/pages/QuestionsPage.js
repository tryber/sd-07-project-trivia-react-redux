import React from 'react';
import Questions from '../Components/Questions';
import Header from '../Components/Header';
import Timer from '../Components/Timer';

class QuestionsPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
        <Timer />
      </div>
    );
  }
}

export default QuestionsPage;
