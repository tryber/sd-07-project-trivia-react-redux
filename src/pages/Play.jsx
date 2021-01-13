import React from 'react';
import '../App.css';
import QuestionForm from '../Components/QuestionForm';

class Play extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="container-form">
          <QuestionForm />
        </div>
        <div className="bottom-content">
          <p>Todos os direitos reservados </p>
        </div>
      </div>
    );
  }
}
export default Play;
