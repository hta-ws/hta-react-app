import { combineReducers } from 'redux';
import Common from './Common';
import Layout from './Layout';
import Admin from './Admin';

const reducers = () =>
  combineReducers({
    common: Common,
    layout: Layout,
    admin: Admin,
  });
export default reducers;
