import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
      </div>
    );
  }
}

// Ranking.propTypes = {
//   // emailSave: PropTypes.string.isRequired,
//   // nameSave: PropTypes.string.isRequired,
//   // history: PropTypes.shape.isRequired,
// };

// const mapStateToProps = (state) => ({
//   emailSave: state.infoPlayer.emailPlayer,
//   nameSave: state.infoPlayer.namePlayer,
//   tokenValue: state.token.token,
// });

// export default connect(mapStateToProps)(Ranking);
export default Ranking;
