import actions from './actions';

const ENDPOINT_TRIVIA_CATEGORIES = 'https://opentdb.com/api_category.php';

export default function fetchTriviaCategories() {
  return async (dispatch) => {
    dispatch(actions.request());
    try {
      const response = await fetch(ENDPOINT_TRIVIA_CATEGORIES);
      const result = await response.json();
      dispatch(actions.receiveSuccess(result.trivia_categories));
    } catch (error) {
      dispatch(actions.receiveFail(error));
    }
  };
}
