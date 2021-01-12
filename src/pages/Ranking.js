import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../Redux/Actions";

class Ranking extends React.Component {
  constructor() {
    super();

    // A chave state deve conter a seguinte estrutura:
    // player: {
    //     name,
    //     assertions,
    //     score,
    //     gravatarEmail
    // }

    //     A chave ranking deve conter a seguinte estrutura:
    // [
    //   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
    // ]

    this.state = {
      player: {
        name = '',
        assertions = '',
        score = '',
        gravatarEmail = '',
      },
      ranking: {
        name: 'João', 
        score: '', 
        picture: ''
      }
    };
  }

  render() {
    const { name, score, picture } = this.state.ranking;
    
    return (
      <div>
        <ul>
          <li>{ name }{ score }{ picture }</li>
        </ul>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   getUserProps: (email, name) => dispatch(getUser(email, name)),
// });

// export default connect(null, mapDispatchToProps)(Ranking);

// Ranking.propTypes = {
//   getUserProps: PropTypes.func.isRequired,
// };
