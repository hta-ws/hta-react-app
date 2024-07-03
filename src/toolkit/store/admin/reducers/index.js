import { combineReducers } from 'redux';
import financialStatementReducer from './FinancialStatement';

// Diğer admin reducer'larınız varsa, onları da buraya import edin
// import anotherAdminReducer from './AnotherAdminReducer';

const adminReducer = combineReducers({
  financialStatement: financialStatementReducer,
  // Diğer admin reducer'larınızı buraya ekleyin
  // another: anotherAdminReducer,
});

export default adminReducer;
