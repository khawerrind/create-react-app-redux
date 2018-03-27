import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  router: routerReducer,
  form: reduxFormReducer
});
