import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            alt="Imagem do Perfil"
            src="https://img.ibxk.com.br/2014/06/06/06165614150388.jpg?w=1120&h=420&mode=crop&scale=both"
          />
          <h2
            data-testid="header-player-name"
          >
            { name }
          </h2>
          <h2
            data-testid="header-score"
          >
            0
          </h2>
        </header>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
});

export default connect(mapStateToProps)(Feedback);
