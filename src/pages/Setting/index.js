import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTriviaCategories, setFilter } from '../../store/ducks/triviaSetting';

class Setting extends Component {
  constructor(props) {
    super(props);

    const {
      filter,
    } = this.props;
    const {
      category,
      type,
      difficulty,
    } = filter;

    this.state = {
      category,
      type,
      difficulty,
    };

    this.handleChange = this.handleChange.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.clickReset = this.clickReset.bind(this);
  }

  async componentDidMount() {
    const { getTriviaCategories } = this.props;
    await getTriviaCategories();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  clickSave() {
    const { saveFilter } = this.props;
    const { category, type, difficulty } = this.state;
    saveFilter({ category, type, difficulty });
  }

  clickReset() {
    const { saveFilter } = this.props;
    this.setState({
      category: '',
      type: '',
      difficulty: '',
    }, () => {
      const { category, type, difficulty } = this.state;
      saveFilter({ category, type, difficulty });
    });
  }

  render() {
    const {
      categories,
      history,
    } = this.props;

    const {
      category,
      type,
      difficulty } = this.state;

    return (
      <>
        <h1 data-testid="settings-title">SETTINGS PAGE</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
        <select
          name="category"
          value={ category }
          onChange={ this.handleChange }
        >
          <option value="">Any Category</option>
          { categories
         && categories.map(({ id, name }) => (
           <option key={ id } value={ id }>{name}</option>
         ))}
        </select>
        <select
          name="difficulty"
          value={ difficulty }
          onChange={ this.handleChange }
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          name="type"
          value={ type }
          onChange={ this.handleChange }
        >
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
        <button
          type="button"
          onClick={ this.clickSave }
        >
          Save
        </button>
        <button
          type="button"
          onClick={ this.clickReset }
        >
          Reset
        </button>
      </>
    );
  }
}

Setting.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filter: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  getTriviaCategories: PropTypes.func.isRequired,
  saveFilter: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.triviaSetting.categories,
  filter: state.triviaSetting.filter,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaCategories: () => dispatch(fetchTriviaCategories()),
  saveFilter: (settings) => dispatch(setFilter(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
