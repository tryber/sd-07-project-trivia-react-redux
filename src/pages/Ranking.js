import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.getRanking = this.getRanking.bind(this);

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const rank = localStorage.getItem('ranking');
    console.log(rank);
    const rankObj = JSON.parse(rank);
    this.setState({ ranking: rankObj });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div className="ranking">
        <h2 data-testid="ranking-title">Ranking</h2>
        {ranking.map((element, index) => {
          const { name, score, picture } = element;
          return (
            <div className="ranked" key={ index }>
              <div>
                <img
                  className="gamer-avatar"
                  data-testid="header-profile-picture"
                  src={ `https://www.gravatar.com/avatar/${picture}` }
                  alt="avatar"
                />
              </div>
              <div>
                <h3 data-testid={ `player-name-${index}` }>{ name }</h3>
              </div>
              <div>
                <h3 data-testid={ `player-score-${index}` }>{ score }</h3>
              </div>
            </div>
          );
        })}
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.token.email,
  name: state.token.name,
  points: state.token.points,
});

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Ranking);
