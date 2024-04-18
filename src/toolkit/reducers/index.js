import { combineReducers } from 'redux';
import Common from './Common';
import Layout from './Layout';

const reducers = () =>
  combineReducers({
    common: Common,
    layout: Layout,
  });
export default reducers;
