import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import store from './redux/store';

const RouletteApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default RouletteApp;
