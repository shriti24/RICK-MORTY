import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

const store = createStore(() => [], [], applyMiddleware());

test('renders learn react link', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText('RICK & MORTY')).toBeInTheDocument();
  const nextElement = await screen.getByText('Next');
  waitFor(() => {
    fireEvent.click(nextElement);
  });
  expect(screen.getByText('One moment please...')).toBeInTheDocument();
});
