import { combineReducers } from 'redux';
import Common from './Common';
import Layout from './Layout';
import Admin2 from './Admin2';
import Admin from './Admin';

const reducers = () =>
  combineReducers({
    common: Common,
    layout: Layout,
    admin: Admin2,
    fsAdmin: Admin,
  });
export default reducers;
