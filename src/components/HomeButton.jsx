import React from 'react';
import { Redirect } from 'react-router-dom';

class HomeButton extends React.Component {
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
              className="ui medium button"
              type="button"
              data-testid="btn-go-home"
              onClick={ () => this.setState({ redirect: '/' }) }
            >
              Tela Inicial
            </button>
          )
        )}
      </div>
    );
  }
}

export default HomeButton;
