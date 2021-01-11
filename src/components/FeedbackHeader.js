import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { score, picture, name } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="" src={ picture } />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score,
  picture: state.picture,
  name: state.name, // temos que fazer a conexão com a chave do estado que guardar o store, picture e name para puxar do lugar certo.
});

Feedback.propTypes = {
  score: PropTypes.string.isRequired,
  picture: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
