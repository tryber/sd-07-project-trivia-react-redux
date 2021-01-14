import React from 'react';
import Questions from '../Components/Questions';
import Header from '../Components/Header';

class QuestionsPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default QuestionsPage;
