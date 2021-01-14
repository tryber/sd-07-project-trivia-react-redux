import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class User extends Component {
  render() {
    const { name } = this.props;
    const score = 0;
    return (
      <div>
        <header>
          {/* <p data-testid="header-profile-picture">{img}</p> */}
          <p data-testid="header-player-name">
            Nome:
            { name }
          </p>
          <p data-testid="header-score">
            Score:
            { score }
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
});

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(User);
