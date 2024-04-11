import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import './assets/scss/themes.scss';
import AppContextProvider from '@hta/context/AppContextProvider';
import AuthRoutes from '@hta/components/AuthRoutes';
import configureStore from './toolkit/store';
import AppAuthProvider from '@hta/core/AppAuthProvider';
import AppLayout from '@hta/core/AppLayout';
import AppLocaleProvider from '@hta/context/AppLocaleProvider';

const store = configureStore();
function App() {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <AppLocaleProvider>
          <BrowserRouter>
            <AppAuthProvider>
              <AuthRoutes>
                <AppLayout />
              </AuthRoutes>
            </AppAuthProvider>
          </BrowserRouter>
        </AppLocaleProvider>
      </Provider>
    </AppContextProvider>
  );
}

export default App;
