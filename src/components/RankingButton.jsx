import React from 'react';
import { Redirect } from 'react-router-dom';

class RankingButton extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        {(redirect
          ? <Redirect to={ redirect } />
          : (
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => this.setState({ redirect: '/ranking' }) }
            >
              Ver Ranking
            </button>
          )
        )}
      </div>
    );
  }
}

export default RankingButton;
