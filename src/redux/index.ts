import {combineReducers} from 'redux';
import CategoryReducer from './Category/categoryReducer';

const rootReducer = combineReducers({
  Inventory: CategoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
