import React from 'react';

class Feedback extends React.Component {
  
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
          Ranking
        </button>
      </div>
    );
  }
}

export default Feedback;