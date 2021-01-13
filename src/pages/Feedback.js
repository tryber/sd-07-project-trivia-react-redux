import React from 'react';

class Feedback extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }
  
  render() {
    return (
      <div className="feedback">
        Tela de feedback
        <button
          onClick={ this.handleClick }
          data-testid="btn-ranking"
          type="button"
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

export default Feedback;